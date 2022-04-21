import express from "express";
import * as functions from "firebase-functions";
import {getDatabase, ref, set} from "firebase/database";
import firebase from "../firebase";
import cors from 'cors';
import { getForums, postForum } from "./routes/forum";
import { getFigures, postFigure } from "./routes/figure";
import { getOrders, postOrder } from "./routes/order";
import { getUsers } from "./routes/user";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const app = express();
app.use(cors({origin: true}));

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

app.get("/figure", (req, res) => {
  getFigures(req, res);
})

app.get("/forum", (req, res) => {
  getForums(req, res);
})

app.get("/order", (req, res) => {
  getOrders(req, res);
})

app.get("/user", (req, res) => {
  getUsers(req, res);
})

app.post('/figure', (req, res) => {
  console.log(req.body);
  postFigure(req, res);
});

app.post('/forum', (req, res) => {
  console.log(req.body);
  postForum(req, res);
});

app.post('/order', (req, res) => {
  console.log(req.body);
  postOrder(req, res);
});


export default functions.https.onRequest(app) ;
