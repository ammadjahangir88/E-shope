// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAVF4FY4Laib4pcNl7XEW1XK9evmy3gv6E",
  authDomain: "eshop-c3089.firebaseapp.com",
  projectId: "eshop-c3089",
  storageBucket: "eshop-c3089.appspot.com",
  messagingSenderId: "1094442723578",
  appId: "1:1094442723578:web:902f237afc14f67ab24143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app)
export const db= getFirestore(app)
export const storage=getStorage(app)

export default app