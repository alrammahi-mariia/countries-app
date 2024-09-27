import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

const addFavouriteToFirebase = async (uid, name) => {
  try {
    //check whether name is undefined, empty, or not a string before attempting to add it to the Firestore database.
    if (!name || typeof name !== "string" || name.trim() === "") {
      console.error("Error adding favourite to Firebase: Invalid 'name' value");
      return;
    }
    await addDoc(collection(db, `users/${uid}/favourites`), { name });

    console.log("Favourite added to Firebase");
  } catch (error) {
    console.log("Error adding data to firebase", error);
  }
};

const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error(
        "Error removing favourite from firebase: Name parameter undefined"
      );
      return;
    }
    const q = query(
      collection(db, `users/${uid}/favourites`),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourite removed from the Firebase");
    });
  } catch (error) {
    console.log("Error removing data from database");
  }
};

const clearFavouritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourites cleared from database");
    });
  } catch (error) {
    console.log("Error clearing data from database", error);
  }
};

export {
  auth,
  db,
  addFavouriteToFirebase,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  removeFavouriteFromFirebase,
  clearFavouritesFromFirebase,
};
