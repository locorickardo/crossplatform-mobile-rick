// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMmYkfdTMoupLQF8tEFQtsic9LjtyTzd8",
  authDomain: "megasupercooldragon.firebaseapp.com",
  projectId: "megasupercooldragon",
  storageBucket: "megasupercooldragon.appspot.com",
  messagingSenderId: "719804295406",
  appId: "1:719804295406:web:f67f543af2f028faf62bff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
