import {Request, Response} from "express";
import {ForumPost, ForumStatus, ForumThread} from "../models/forum";

// const forumRouter = Router();

export const TEMP_FORUM_DB: { [key:string]: ForumThread } = {
  "forum1": new ForumThread({
    authorId: "user1",
    datePosted: new Date(),
    content: "first post content",
    title: "forum1",
    status: ForumStatus.New,
    posts: [
      {
        authorId: "user1",
        datePosted: new Date(),
        content: "test followup",
      },
    ],
  }),
  "forum2": new ForumThread({
    authorId: "user2",
    datePosted: new Date(),
    content: "first post content",
    title: "forum2",
    status: ForumStatus.InProgress,
    posts: [
      {
        authorId: "user2",
        datePosted: new Date(),
        content: "test followup",
      },
      {
        authorId: "user1",
        datePosted:
        new Date(),
        content: "test reply",
      },
    ],
  }),
};

export async function getForums(req: Request, res: Response) {
  console.log("hit forum endpoint");
  const forumId = req.query.forumId?.toString();
  try {
    if (forumId) {
      // TODO: add query to find forum by id
      const forum = TEMP_FORUM_DB[forumId];
      if (forum) {
        const data = {
          [forumId]: forum,
        };
        res.send(data);
      } else {
        res.status(404).send("Forum not found");
      }
    } else {
      // TODO: add query for all forums
      const forums = TEMP_FORUM_DB;
      res.send(forums);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// forumRouter.get("/", [], async function(req: Request, res: Response) {
//   console.log("hit forum endpoint");
//   const forumId = req.query.forumId?.toString();
//   try {
//     if (forumId) {
//       // TODO: add query to find forum by id
//       const forum = TEMP_FORUM_DB[forumId];
//       if (forum) {
//         const data = {
//           [forumId]: forum,
//         };
//         res.send(data);
//       } else {
//         res.status(404).send("Forum not found");
//       }
//     } else {
//       // TODO: add query for all forums
//       const forums = TEMP_FORUM_DB;
//       res.send(forums);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

export async function postForum(req: Request, res: Response) {
  const forumId = req.query.forumId?.toString();
  if (forumId) {
    // TODO: Update existing forum thread
    // Add forum post
    const forum = TEMP_FORUM_DB[forumId];
    if (forum) {
      const post = new ForumPost(req.body);
      forum.addPost(post);
      res.send(forum);
    } else {
      res.status(404).send("Forum not found");
    }
  } else {
    // TODO: insert new forum
    // New forum
    const newForum = new ForumThread(req.body);
    const forumId = "forum3";
    const data = {
      [forumId]: newForum,
    };
    res.send(data);
  }
}

// forumRouter.post("/", [], async function(req: Request, res: Response) {
//   const forumId = req.query.forumId?.toString();
//   if (forumId) {
//     // TODO: Update existing forum thread
//     // Add forum post
//     const forum = TEMP_FORUM_DB[forumId];
//     if (forum) {
//       const post = new ForumPost(req.body);
//       forum.addPost(post);
//       res.send(forum);
//     } else {
//       res.status(404).send("Forum not found");
//     }
//   } else {
//     // TODO: insert new forum
//     // New forum
//     const newForum = new ForumThread(req.body);
//     const forumId = "forum3";
//     const data = {
//       [forumId]: newForum,
//     };
//     res.send(data);
//   }
// });

// export default forumRouter;
