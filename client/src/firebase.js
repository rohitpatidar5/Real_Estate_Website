// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5ce5b.firebaseapp.com",
  projectId: "mern-estate-5ce5b",
  storageBucket: "mern-estate-5ce5b.appspot.com",
  messagingSenderId: "1032035141117",
  appId: "1:1032035141117:web:24e2d36ec8801edf578594"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);