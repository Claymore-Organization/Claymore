import dotenv from "dotenv";
dotenv.config();
import {AssertionError} from "assert";
import {initializeApp} from "firebase/app";
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
if (firebaseConfig.projectId == null ||
  firebaseConfig.projectId == undefined) {
  throw new AssertionError({
    message: "Add a .env file in the backend, " +
      "check the slack!"});
}
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
