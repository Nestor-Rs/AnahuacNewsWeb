// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"
//librerias https://firebase.google.com/docs/web/learn-more?hl=es-419#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwt73jMg3A6pO2tFz9a7OEeecn_rGNI3E",
  authDomain: "anahuacnews-e419f.firebaseapp.com",
  projectId: "anahuacnews-e419f",
  storageBucket: "anahuacnews-e419f.appspot.com",
  messagingSenderId: "893247985958",
  appId: "1:893247985958:web:d95bde8b0b5d8ab56149e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//DB
export const db = getFirestore(app);