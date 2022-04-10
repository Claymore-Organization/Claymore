import { Request, Response, Router } from "express";
import { Forum } from "../models/forum";

const forumRouter = Router();

forumRouter.get('/', [], async function (req: Request, res: Response) {
    const forumId = req.query.forumId?.toString();
    if (!forumId) {
        res.status(400).send('Param forumId is missing');
        return;
    }

    try {
        const forum = new Forum(forumId);
        res.send(forum);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default forumRouter;
