import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDU0n126UY0irj7e54rY5x9ypLLN2saf8",
  authDomain: "fingerscanlocauth.firebaseapp.com",
  projectId: "fingerscanlocauth",
  storageBucket: "fingerscanlocauth.firebasestorage.app",
  messagingSenderId: "993142217187",
  appId: "1:993142217187:web:e81bcd56496468b31ba8d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  
export  { auth, db };