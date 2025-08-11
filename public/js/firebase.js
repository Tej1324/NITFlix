import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,         
  deleteDoc,     // ✅ Add this
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdnckXpVsKdNoVjwN95u4O1ey-eZhZBhg",
  authDomain: "bookmynitshow-adf83.firebaseapp.com",
  projectId: "bookmynitshow-adf83",
  storageBucket: "bookmynitshow-adf83.appspot.com",
  messagingSenderId: "76671152034",
  appId: "1:76671152034:web:9dd3e74e668327cd834cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Export everything you need — no duplicates!
export {
  db,
  auth,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,     // ✅ Add this
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp,
  getAuth,
  onAuthStateChanged
};
export const provider = new GoogleAuthProvider();
export { signInWithPopup };
