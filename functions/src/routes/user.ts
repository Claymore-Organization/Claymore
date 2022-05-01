import {Request, Response} from "express";
import {User} from "../models/user";
import {getDatabase, ref, get, child, update} from "firebase/database";
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

export async function newUser(req: Request, res: Response) {
  const userId = req.query.userId?.toString();
  const username = req.query.username?.toString();
  const imageURL = req.query.imageurl?.toString();
  try {
    const db = getDatabase(firebase);
    if (userId && username && imageURL) {
      // Need to update the user this order was made for
      const userRef = ref(db, "user");
      const theNewUser = {
        [userId]: {
          username: username,
          orders: [],
          image: imageURL,
        },
      };
      update(userRef, theNewUser);
      res.send(theNewUser);
    } else {
      let response = "Not all user fields specified";
      if (!userId) {
        response += " No user id";
      }
      if (!username) {
        response += " No username";
      }
      if (!imageURL) {
        response += " No image url";
      }
      res.status(400).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
