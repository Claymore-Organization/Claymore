import {Request, Response} from "express";
import {User} from "../models/user";
import {getDatabase, ref, get, child} from "firebase/database";
import firebase from "../../firebase";

export async function getUsers(req: Request, res: Response) {
  const userId = req.query.userId?.toString();
  try {
    const db = getDatabase(firebase);
    const dbRef = ref(db, "user");
    if (userId) {
      get(child(dbRef, `${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = {[userId]: new User(snapshot.val())};
          res.send(data);
        } else {
          res.status(404).send("User not found");
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
