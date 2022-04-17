import {Request, Response, Router} from "express";
import {User} from "../models/user";

const userRouter = Router();

export const TEMP_USER_DB: { [key:string]: User } = {
  "user1": new User({
    username: "testuser1",
    image: "image URL", orders: ["order1"],
  }),
  "user2": new User({
    username: "testuser2",
    image: "image URL", orders: ["order2"],
  }),
};

userRouter.get("/", [], async function(req: Request, res: Response) {
  const userId = req.query.userId?.toString();
  try {
    if (userId) {
      // TODO: add query to find user by id
      const user = TEMP_USER_DB[userId];
      if (user) {
        const data = {
          [userId]: user,
        };
        res.send(data);
      } else {
        res.status(404).send("User not found");
      }
    } else {
      // TODO: add query for all users
      const users = TEMP_USER_DB;
      res.send(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default userRouter;
