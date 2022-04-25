import {Request, Response} from "express";
import {Figure} from "../models/figure";
import {getDatabase, ref, get, child, update, push} from "firebase/database";
import firebase from "../../firebase";

// e.g.
// http://localhost:5001/claymore-d6749/us-central1/default/figure?figureId=figure1
export async function getFigures(req: Request, res: Response) {
  const figureId = req.query.figureId?.toString();
  try {
    const db = getDatabase(firebase);
    const dbRef = ref(db, "figure");
    if (figureId) {
      get(child(dbRef, `${figureId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = {[figureId]: new Figure(snapshot.val())};
          res.send(data);
        } else {
          res.status(404).send("Figure not found");
        }
      });
    } else {
      get(dbRef).then((snapshot) => {
        res.send(snapshot.val());
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function postFigure(req: Request, res: Response) {
  try {
    const db = getDatabase(firebase);
    const figureId = push(child(ref(db), "figure")).key;
      if (figureId == null) { // Should never fire.
        res.status(500).send("DB could not make a new figure id");
        return;
      }
    const data = {
      [figureId]: req.body,
    };
    update(ref(db, "figure"), data);
    res.send({ [figureId]: new Figure(data) });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
