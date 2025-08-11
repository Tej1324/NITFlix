// auth-handler.js
import { auth, onAuthStateChanged } from './firebase.js';

onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Please login first to access this page.");
    window.location.href = "index.html";
  }
});
