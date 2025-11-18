// Firebase SDK v9 (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-c2K7uTTcyEB5ucsoT17A_gx3qJI9iVw",
    authDomain: "portfolio-26e0c.firebaseapp.com",
    projectId: "portfolio-26e0c",
    storageBucket: "portfolio-26e0c.firebasestorage.app",
    messagingSenderId: "214443082318",
    appId: "1:214443082318:web:a40bec4918fb0dd39fb91f",
    measurementId: "G-Z1DN9MHWLW"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
