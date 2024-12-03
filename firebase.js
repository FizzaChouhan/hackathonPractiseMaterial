
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged,sendEmailVerification ,updateProfile, signOut ,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
  import {getFirestore,collection, addDoc , doc, setDoc , getDocs,deleteDoc,updateDoc, serverTimestamp,getDoc,onSnapshot  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB707Xx_XoTdU69npsSNbWFNcfcVGp-faE",
    authDomain: "hackathon-a886d.firebaseapp.com",
    projectId: "hackathon-a886d",
    storageBucket: "hackathon-a886d.firebasestorage.app",
    messagingSenderId: "698354998455",
    appId: "1:698354998455:web:160314db14e1036b144132",
    measurementId: "G-J7GSQCWENT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const auth = getAuth();
const user = auth.currentUser;
  export {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,sendEmailVerification,updateProfile, signOut,GoogleAuthProvider,provider,signInWithPopup,db,collection, addDoc , doc, setDoc , getDocs,deleteDoc,updateDoc,user, serverTimestamp,getDoc,auth,onSnapshot,}