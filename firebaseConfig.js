import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
import { getFirestore } from 'firebase/firestore';
// import firebase from 'firebase/app'; // Import firebase as a default export

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

// Initialize Firebase

// const app = !initializeApp.apps.length ? initializeApp(firebaseConfig) : initializeApp.apps[0];

// Initialize Firebase only if it hasn't been initialized yet
// const app = initializeApp(firebaseConfig);
// // const DB = getFirestore();
// const db = getFirestore(app); // Add Firestore
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });