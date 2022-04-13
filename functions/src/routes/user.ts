import express, {Request, Response} from "express";
import {User} from "../models/user";

const userRouter = express.Router();

userRouter.get("/", [], async function(req: Request, res: Response) {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send("Param userId is missing");
    return;
  }

  try {
    const user = new User(userId, "username", "image URL");
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default userRouter;
