// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADYuDf6wMRpqal6jp-uOMQMUIz7qHpBHc",
  authDomain: "fir-practice-522f8.firebaseapp.com",
  projectId: "fir-practice-522f8",
  storageBucket: "fir-practice-522f8.firebasestorage.app",
  messagingSenderId: "143340812952",
  appId: "1:143340812952:web:0eaa7f24e6e31c17ffaeed",
  measurementId: "G-C4G30VWNNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)