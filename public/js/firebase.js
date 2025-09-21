import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp,
  runTransaction   // ✅ make sure it’s here
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdnckXpVsKdNoVjwN95u4O1ey-eZhZBhg",
  authDomain: "bookmynitshow-adf83.firebaseapp.com",
  projectId: "bookmynitshow-adf83",
  storageBucket: "bookmynitshow-adf83.appspot.com",
  messagingSenderId: "76671152034",
  appId: "1:76671152034:web:9dd3e74e668327cd834cfb"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Exports
export {
  db,
  auth,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp,
  runTransaction,      // ✅ make sure it’s exported
  onAuthStateChanged,
  signInWithPopup
};

export const provider = new GoogleAuthProvider();
