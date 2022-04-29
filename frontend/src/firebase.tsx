// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { path } from './config';
import axios from 'axios';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    const firebase_response = await signInWithPopup(auth, googleProvider);
    const firebase_user = firebase_response.user;
    await fetch(`${path}/user?userId=${firebase_user.uid}`).then(
      async (res) => {
        if (res.status == 404) {
          // If the user was not found, create a new one.
          const newUser = {
            userId: firebase_user.uid,
            username: firebase_user.displayName,
            imageurl: firebase_user.photoURL,
          }
          try {
            axios.post(`${path}/user`, {}, { params: newUser })
          } catch (err) {
              console.error(err);
          }
        }
      }
    , (err) => {
      console.error(err);
    });
};

export const logout = () => {
  try {
    signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export default app