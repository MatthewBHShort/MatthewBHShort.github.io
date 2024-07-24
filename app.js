import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyATFx-WHCXHC2uA0FZZwIcPO7LAjRh8Wjg",
    authDomain: "energy-coaching-cbbc5.firebaseapp.com",
    databaseURL: "https://energy-coaching-cbbc5-default-rtdb.firebaseio.com",
    projectId: "energy-coaching-cbbc5",
    storageBucket: "energy-coaching-cbbc5.appspot.com",
    messagingSenderId: "85932482016",
    appId: "1:85932482016:web:9852865b84481d33f41f85",
    measurementId: "G-DWJ540T6WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Authentication
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in
    loadDashboard();
  } else {
    // User is signed out
    // Redirect to login or show login form
  }
});
