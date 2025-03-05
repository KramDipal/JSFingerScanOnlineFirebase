import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasEnrolledFingerprints, setHasEnrolledFingerprints] = useState(false);

  // Check for biometric hardware and enrolled fingerprints on component mount
  useEffect(() => {
    (async () => {
      // Check if the device supports biometric authentication
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      // Check if fingerprints are enrolled
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setHasEnrolledFingerprints(enrolled);
    })();
  }, []);

  // Handle the fingerprint scan
  const handleFingerprintScan = async () => {
    try {
      if (!isBiometricSupported) {
        Alert.alert('Error', 'Biometric authentication is not supported on this device.');
        return;
      }

      if (!hasEnrolledFingerprints) {
        Alert.alert('Error', 'No fingerprints enrolled. Please set up fingerprints in your device settings.');
        return;
      }

      // Trigger the authentication prompt
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Scan your fingerprint to authenticate',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false, // set to 'false 'Allows fallback to passcode if fingerprint fails
        // requireConfirmation: true,
      });

      if (result.success) {
        Alert.alert('Success', 'Fingerprint authentication successful!');
        // Proceed with your app logic here (e.g., navigation, unlocking content)
      } else {
        Alert.alert('Failed', 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred during authentication.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Authentication</Text>
      <Text style={styles.status}>
        {isBiometricSupported
          ? 'Biometric hardware is available'
          : 'Biometric hardware is not available'}
      </Text>
      <Text style={styles.status}>
        {hasEnrolledFingerprints
          ? 'Fingerprints are enrolled'
          : 'No fingerprints enrolled'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleFingerprintScan}>
        <Text style={styles.buttonText}>Scan Fingerprint</Text>
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
});