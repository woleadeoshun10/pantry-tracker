import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPI3cXVpPFJjqFeqF0TmVHd3tXSOtCpyk",
  authDomain: "hspanntryapp.firebaseapp.com",
  projectId: "hspanntryapp",
  storageBucket: "hspanntryapp.appspot.com",
  messagingSenderId: "515744385790",
  appId: "1:515744385790:web:2e8cc2f7ac839a366273af",
  measurementId: "G-4WRQT04ZV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Correct usage

export { app, firestore };
