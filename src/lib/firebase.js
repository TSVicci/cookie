// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAIKF9mTmqUopBVgNW_TG6X8rxA8R0gDTA",
  authDomain: "cookieproject-beff9.firebaseapp.com",
  projectId: "cookieproject-beff9",
  storageBucket: "cookieproject-beff9.appspot.com",
  messagingSenderId: "888587203851",
  appId: "1:888587203851:web:fb210c02547fe658289e0e",
  measurementId: "G-LRR7487K76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
