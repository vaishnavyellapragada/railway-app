import React, { useState } from 'react';
// Import your firebase auth functions here if you have them, e.g.:
// import { auth, provider, signInWithPopup, signOut } from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('number'); // 'number' or 'route'
  const [trainNumber, setTrainNumber] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null); // Replace with your actual Firebase user state

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Call your existing backend API fetch logic here
    setTimeout(() => {
      setLoading(false);
      // Example result structure for demo presentation
      setResult({
        trainName: '12723 - Telangana Express',
        status: 'On Time',
        currentStation: 'Kazipet Jn (KZJ)',
        delayMinutes: 0,
        nextStation: 'Secunderabad Jn (SC)',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

      {/* 1. Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            RailPulse
          </span>
        </div>

        {/* Auth Section */}
        <div>
          {user ? (
            <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700">
              <img src={user.photoURL} alt="User" className="w-7 h-7 rounded-full" />
              <span className="text-sm font-medium">{user.displayName}</span>
            </div>
          ) : (
            <button
              onClick={() => {/* Trigger Google Sign In */ }}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-xl border border-slate-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign in with Google
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Live Train Status & Route Tracking
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real-time transit updates powered by modern scraping architecture.
          </p>
        </div>

        {/* 3. Search Card Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">

          {/* Tab Selection */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl mb-6 border border-slate-800/80">
            <button
              onClick={() => setActiveTab('number')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'number'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              By Train Number
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'route'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              Station to Station
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            {activeTab === 'number' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Train Number or Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 12723 or Telangana Express"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    From Station
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad (HYB)"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    To Station
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi (NDLS)"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Submit Button with Hover Effects */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Fetching Live Status...</span>
                </>
              ) : (
                <span>Search Live Status</span>
              )}
            </button>
          </form>
        </div>

        {/* 4. Dynamic Results Card */}
        {result && (
          <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{result.trainName}</h3>
                <p className="text-sm text-slate-400">Current Station: {result.currentStation}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                ● {result.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <div>
                <span className="text-slate-500 block text-xs">NEXT STOP</span>
                <span className="font-semibold">{result.nextStation}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-xs">DELAY STATUS</span>
                <span className="font-semibold text-emerald-400">0 Mins Delay</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}