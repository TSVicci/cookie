// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase config
const firebaseConfig = {
	apiKey: "AIzaSyD0dLTEOSTYl1xVyRCN7ilQGAhxsgKpJrs",
	authDomain: "tavling2-b8d0c.firebaseapp.com",
	projectId: "tavling2-b8d0c",
	storageBucket: "tavling2-b8d0c.appspot.com",
	messagingSenderId: "5112802344",
	appId: "1:5112802344:web:ff866e8890b35f3e7b191d",
	measurementId: "G-VHWJDEWRDM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize Firestore
export const db = getFirestore(app);
