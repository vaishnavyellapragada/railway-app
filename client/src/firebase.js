import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfmv3aZWautolAbbkZ82V-pyhg5af9EGA",
    authDomain: "railway-app-3b63c.firebaseapp.com",
    projectId: "railway-app-3b63c",
    storageBucket: "railway-app-3b63c.firebasestorage.app",
    messagingSenderId: "1065615112032",
    appId: "1:1065615112032:web:9a8e0840083d259c3cd005"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Google Login Error:", error);
    }
};

export const logoutUser = () => signOut(auth);