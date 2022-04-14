import { Request, Response, Router } from "express";
import { User } from "../models/user";

const userRouter = Router();

const TEMP_DB: { [key:string]: User } = {
    'user1': new User({username: 'testuser1', image: 'image URL'}),
    'user2': new User({username: 'testuser2', image: 'image URL'})
}

userRouter.get('/', [], async function (req: Request, res: Response) {
    const userId = req.query.userId?.toString();
    try {
        if (userId) {
            // TODO: add query to find user by id
            const user = TEMP_DB[userId];
            if (user) {
                res.send(user);
            }
            else {
                res.status(404).send('User not found');
            }
        } else {
            // TODO: add query for all users
            const users = TEMP_DB
            res.send(users);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default userRouter;
