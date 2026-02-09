



// const firebaseConfig = {
//   apiKey: "AIzaSyBojL7DH2JyT11YzSwTkolerl6oTGyeY88",
//   authDomain: "myecom-285c3.firebaseapp.com",
//   projectId: "myecom-285c3",
//   storageBucket: "myecom-285c3.firebasestorage.app",
//   messagingSenderId: "94575430828",
//   appId: "1:94575430828:web:baa0178a8bfe253cdc6309",
//   measurementId: "G-JCCRYCWY1D"
// };







import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
