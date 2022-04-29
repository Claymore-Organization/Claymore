import express from "express";
import * as functions from "firebase-functions";
import cors from "cors";
import {getForums, postForum} from "./routes/forum";
import {getFigures, postFigure} from "./routes/figure";
import {getOrders, postOrder} from "./routes/order";
import {getUsers, newUser} from "./routes/user";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const app = express();
app.use(cors({origin: true}));

app.get("/figure", (req, res) => {
  getFigures(req, res);
});

app.get("/forum", (req, res) => {
  getForums(req, res);
});

app.get("/order", (req, res) => {
  getOrders(req, res);
});

app.get("/user", (req, res) => {
  getUsers(req, res);
});

app.post("/figure", (req, res) => {
  postFigure(req, res);
});

app.post("/forum", (req, res) => {
  postForum(req, res);
});

app.post("/order", (req, res) => {
  postOrder(req, res);
});

app.post("/user", (req, res) => {
  newUser(req, res);
});

export default functions.https.onRequest(app);
