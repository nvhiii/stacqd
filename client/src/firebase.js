// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stacqdd.firebaseapp.com",
  projectId: "stacqdd",
  storageBucket: "stacqdd.appspot.com",
  messagingSenderId: "670608635926",
  appId: "1:670608635926:web:aa0d5700829abc9b261d37",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // for usage in other places in app
