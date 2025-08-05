import { auth, provider, signInWithPopup, onAuthStateChanged } from './firebase.js';

const loginBtn = document.getElementById('loginBtn');
const bookBtn = document.getElementById('bookTicketsBtn');
const bookNowBtn = document.getElementById('bookNowBtn');
const bookSeatsBtn = document.getElementById('bookSeatsBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify({ uid: result.user.uid, displayName: result.user.displayName || '' }));
        alert(`Logged in as ${result.user.displayName || result.user.email}`);
        enableButtons();
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  });
}

function enableButtons() {
  if (bookBtn) {
    bookBtn.disabled = false;
    bookBtn.addEventListener('click', () => {
      window.location.href = 'show-booking.html';
    });
  }
  if (bookNowBtn) {
    bookNowBtn.disabled = false;
    bookNowBtn.addEventListener('click', () => {
      window.location.href = 'show-booking.html';
    });
  }
  if (bookSeatsBtn) {
    bookSeatsBtn.disabled = false;
    bookSeatsBtn.addEventListener('click', () => {
      window.location.href = 'show-booking.html';
    });
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName || '' }));
    console.log("User authenticated:", user.displayName || user.email);
    enableButtons();
  }
});
