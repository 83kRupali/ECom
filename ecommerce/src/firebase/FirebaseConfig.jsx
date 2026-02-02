// https://console.firebase.google.com/u/2/project/myecom-285c3/overview




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBojL7DH2JyT11YzSwTkolerl6oTGyeY88",
  authDomain: "myecom-285c3.firebaseapp.com",
  projectId: "myecom-285c3",
  storageBucket: "myecom-285c3.firebasestorage.app",
  messagingSenderId: "94575430828",
  appId: "1:94575430828:web:baa0178a8bfe253cdc6309",
  measurementId: "G-JCCRYCWY1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB, auth}

