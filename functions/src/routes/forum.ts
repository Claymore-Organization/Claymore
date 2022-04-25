import {Request, Response} from "express";
import {ForumPost, ForumThread} from "../models/forum";
import {getDatabase, ref, get, child, update, push} from "firebase/database";
import firebase from "../../firebase";

export async function getForums(req: Request, res: Response) {
  const forumId = req.query.forumId?.toString();
  const db = getDatabase(firebase);
  const dbRef = ref(db, "forum");
  try {
    if (forumId) {
      get(child(dbRef, `${forumId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = {[forumId]: snapshot.val()};
          res.send(data);
        } else {
          res.status(404).send("Forum not found");
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

export async function postForum(req: Request, res: Response) {
  const forumId = req.query.forumId?.toString();
  try {
    const db = getDatabase(firebase);
    if (forumId) {
      // Add forum post
      const dbRef = ref(db, `forum/${forumId}`);
      get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          const forum = new ForumThread(snapshot.val());
          const post = new ForumPost(req.body);
          forum.addPost(post);
          update(dbRef, forum);
          res.send(forum);
        } else {
          res.status(404).send("Forum not found");
        }
      });
    } else {
      // Create new forum
      const newForum = new ForumThread(req.body);
      if (newForum.title == "") {
        res.status(400).send("Trying to make a forum without a title.");
        return;
      }
      const forumId = push(child(ref(db), "forum")).key;
      if (forumId == null) { // Should never fire.
        res.status(500).send("DB could not make a new forum id");
        return;
      }
      update(ref(db, `forum/${forumId}`), newForum);
      const data = {
        [forumId]: newForum,
      };
      res.send(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
