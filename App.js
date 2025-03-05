import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

// import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";


import { signInWithEmailAndPassword, onAuthStateChanged, } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore functions
import { auth, db } from './firebaseConfig';



// import { getFirestore } from 'firebase/firestore';
// import firebase from 'firebase/app'; // Import firebase as a default export

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDDU0n126UY0irj7e54rY5x9ypLLN2saf8",
//   authDomain: "fingerscanlocauth.firebaseapp.com",
//   projectId: "fingerscanlocauth",
//   storageBucket: "fingerscanlocauth.firebasestorage.app",
//   messagingSenderId: "993142217187",
//   appId: "1:993142217187:web:e81bcd56496468b31ba8d6"
// };

// Initialize Firebase
// const app = !initializeApp.apps.length ? initializeApp(firebaseConfig) : initializeApp.apps[0];
// Initialize Firebase only if it hasn't been initialized yet
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); // Add Firestore
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
  

  export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // Store Firebase UID
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lastLogin, setLastLogin] = useState(null); // Store last login timestamp
    const maxAttempts = 3;
  
    // Monitor Firebase auth state
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUserId(user.uid); // Confirm user is signed in with their Firebase UID
          console.log('Firebase User Authenticated:', user.uid);
        } else {
          setIsAuthenticated(false);
          setUserId(null);
          setLastLogin(null);
          console.log('No Firebase user authenticated.');
        }
      });
  
      // Check biometric support
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!compatible || !enrolled) {
          Alert.alert('Error', 'Biometric authentication is not available or not set up.');
        }
      })();
  
      return () => unsubscribe(); // Cleanup listener on unmount
    }, []);
  
        const recordLoginTimestamp = async (uid) => {

            console.log('Recording login timestamp');
            const loginRef = doc(db, 'logins', uid);
            await setDoc(loginRef, { lastLogin: serverTimestamp() }, { merge: true });
            const docSnap = await getDoc(loginRef);
            if (docSnap.exists()) {
              setLastLogin(docSnap.data().lastLogin.toDate().toLocaleString());
            }
          };
    
    // Initial login with email/password
    const initialLogin = async () => {

        console.log('Initial login triggered');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, 'mfl3genAi@gmail.com', 'test123');
        const user = userCredential.user;
        await recordLoginTimestamp(user.uid); // Record timestamp   
        // Store the refresh token securely
        await SecureStore.setItemAsync('firebaseRefreshToken', user.refreshToken);
        Alert.alert('Success', `Initial login successful. Firebase UID: ${user.uid}`);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Initial login failed: ' + error.message);
      }
    };
  
    // Fingerprint authentication with Firebase validation
    const handleFingerprintAuth = async () => {
      try {
        const allowFallback = failedAttempts >= maxAttempts;
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: allowFallback ? 'Use your passcode' : 'Scan your fingerprint',
          disableDeviceFallback: !allowFallback,
        });
  
        if (result.success) {
          setFailedAttempts(0);
  
          // Check if a refresh token exists
          const storedToken = await SecureStore.getItemAsync('firebaseRefreshToken');
          if (storedToken && auth.currentUser) {
            // User is already signed in, verify Firebase status
            await recordLoginTimestamp(auth.currentUser.uid); // Record timestamp   
            Alert.alert('Success', `Fingerprint login successful! Firebase UID: ${auth.currentUser.uid}`);
          } else if (storedToken) {
            await recordLoginTimestamp(auth.currentUser.uid); // Record timestamp   
            // Attempt to sign in with stored token (Firebase will refresh it if valid)
            await signInWithEmailAndPassword(auth, 'mfl3genAi@gmail.com', 'test123'); // Replace with
            
            console.log('Done with signInWithEmailAndPassword authentication')
            //  actual logic if using custom token
            if (auth.currentUser) {
              Alert.alert('Success', `Fingerprint login successful! Firebase UID: ${auth.currentUser.uid}`);
            } else {
              Alert.alert('Error', 'Firebase sign-in failed after fingerprint.');
            }
          } else {
            // No token found, trigger initial login
            await initialLogin();
          }
        } else {
          const newFailedAttempts = failedAttempts + 1;
          setFailedAttempts(newFailedAttempts);
          Alert.alert('Failed', `Attempts remaining: ${maxAttempts - newFailedAttempts}`);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Authentication error: ' + error.message);
      }
    };

    // Clear token and sign out for testing "no token found"
    const clearTokenAndSignOut = async () => {
        try {
        await SecureStore.deleteItemAsync('firebaseRefreshToken'); // Remove stored token
        await auth.signOut(); // Sign out from Firebase
        Alert.alert('Test', 'Token cleared and signed out. Use fingerprint to trigger initial login.');
        } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to clear token or sign out: ' + error.message);
        }
    };


    return (
      <View style={styles.container}>
        <Text style={styles.title}>Firebase Fingerprint Login</Text>
        
        <Image
          source={require('./assets/fingerscan.jpg')}
          style={{ width: 300, height: 300 }}
        />
  
        <Text style={styles.status}>
          Firebase Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </Text>
        <Text style={styles.status}>Firebase UID: {userId || 'None'}</Text>
        <Text style={styles.status}>Last Login: {lastLogin || 'None'}</Text>
        <Text style={styles.status}>Failed Attempts: {failedAttempts}</Text>
        <TouchableOpacity style={styles.button} onPress={handleFingerprintAuth}>
          <Text style={styles.buttonText}>
            {failedAttempts >= maxAttempts ? 'Use Passcode' : 'Scan Fingerprint'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearTokenAndSignOut}>
          <Text style={styles.testButton}>
            Clear Token & Sign out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: '#FF9500', // Orange for testing
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
});