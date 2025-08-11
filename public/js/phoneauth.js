import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdnckXpVsKdNoVjwN95u4O1ey-eZhZBhg",
  authDomain: "bookmynitshow-adf83.firebaseapp.com",
  projectId: "bookmynitshow-adf83",
  storageBucket: "bookmynitshow-adf83.appspot.com", // typo fixed
  messagingSenderId: "76671152034",
  appId: "1:76671152034:web:9dd3e74e668327cd834cfb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
  size: "invisible",
  callback: (response) => {
    // reCAPTCHA solved, allow send OTP
    onSignInSubmit();
  }
}, auth);

// References to HTML elements
const phoneNumberInput = document.getElementById("phoneNumber");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpCodeInput = document.getElementById("otpCode");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

let confirmationResult = null;

// Send OTP
sendOtpBtn.addEventListener("click", () => {
  const phoneNumber = phoneNumberInput.value;
  const appVerifier = window.recaptchaVerifier;

  if (!phoneNumber.startsWith("+91")) {
    alert("Please use international format, e.g., +91XXXXXXXXXX");
    return;
  }

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP Sent");
    })
    .catch((error) => {
      console.error("SMS not sent", error);
      alert("Failed to send OTP");
    });
});

// Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const code = otpCodeInput.value;
  if (!confirmationResult) {
    alert("Send OTP first");
    return;
  }

  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("Phone verified! ✅");
      // Do something after login (e.g., enable booking)
      document.getElementById("bookSeatsBtn").disabled = false;
    })
    .catch((error) => {
      console.error("OTP verification failed", error);
      alert("Invalid OTP ❌");
    });
});
