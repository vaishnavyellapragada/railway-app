import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, googleProvider, db, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [trainNo, setTrainNo] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Handle Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync Search History from Firestore in Real-Time
  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, 'search_history'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const searches = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(searches);
    }, (err) => {
      console.error("Firestore Error:", err);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleLogout = () => signOut(auth);

  const fetchTrainStatus = async (e, searchedTrain = null) => {
    if (e) e.preventDefault();
    const trainToSearch = searchedTrain || trainNo;

    if (!trainToSearch.trim()) return;

    setLoading(true);
    setError(null);
    setStatusData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/train-status/${trainToSearch}`);
      setStatusData(response.data);

      // Save to Firestore if user is authenticated
      if (user) {
        await addDoc(collection(db, 'search_history'), {
          userId: user.uid,
          trainNumber: trainToSearch,
          trainName: response.data.trainName || `Train #${trainToSearch}`,
          timestamp: new Date()
        });
      }
    } catch (err) {
      setError('Failed to fetch train status. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      {/* Header / Auth */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🚆 Railway Tracker</h2>
        {user ? (
          <div>
            <span style={{ marginRight: '10px' }}>Hi, {user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Sign in with Google</button>
        )}
      </div>

      <hr />

      {/* Search Form */}
      <form onSubmit={(e) => fetchTrainStatus(e)} style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Enter Train Number (e.g. 12723)"
          value={trainNo}
          onChange={(e) => setTrainNo(e.target.value)}
          style={{ width: '70%', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', fontSize: '16px', marginLeft: '10px' }}>
          Search
        </button>
      </form>

      {/* Display Status Result */}
      {loading && <p>Fetching live train details...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {statusData && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', background: '#f9f9f9', marginBottom: '20px' }}>
          <h3>{statusData.trainName} ({statusData.trainNumber})</h3>
          <p><strong>Status:</strong> {statusData.status}</p>
          <p><strong>Source:</strong> {statusData.source}</p>
          <p><strong>Last Updated:</strong> {statusData.lastUpdated}</p>
        </div>
      )}

      {/* User Search History Section */}
      {user && (
        <div style={{ marginTop: '30px' }}>
          <h3>🕒 Recent Searches</h3>
          {history.length === 0 ? (
            <p style={{ color: '#666' }}>No recent searches found. Try searching for a train number above!</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {history.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setTrainNo(item.trainNumber);
                    fetchTrainStatus(null, item.trainNumber);
                  }}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    display: 'flex',
                    justify: 'space-between',
                    background: '#fff'
                  }}
                >
                  <span><strong>{item.trainNumber}</strong> - {item.trainName}</span>
                  <span style={{ color: '#007bff', fontSize: '14px' }}>Re-search ↺</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}