import express from "express";
import * as functions from "firebase-functions";
import {getDatabase, ref, set} from "firebase/database";
import firebase from "../firebase";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
import router from "./routes";
const app = express();
app.use(router);
const firebasePort = 3000;

app.listen(firebasePort, () => {
  console.log("server is listening at http://localhost:" + firebasePort);
});
app.get("/", (req, res) => {
  res.send("hello worldy");
});
// Just an example of how to use the database
// http://localhost:5000/claymore-d6749/us-central1/default/dog
app.get("/dog", (req, res) => {
  res.send("updating database");
  functions.logger.info("Hello logs!", {structuredData: true});
  const db = getDatabase(firebase);
  set(ref(db, "users/1"), {
    username: "alex4",
  });
});
export default functions.https.onRequest(app);
