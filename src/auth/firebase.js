import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration which enables application to connect to Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // best preactice to hide your API key if it is pushed to public repo
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countries-app-f35f7.firebaseapp.com",
  projectId: "countries-app-f35f7",
  storageBucket: "countries-app-f35f7.appspot.com",
  messagingSenderId: "618537013792",
  appId: "1:618537013792:web:a3a6c9fda4ada62f0b6245",
  measurementId: "G-5WHR2FJ0BH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
