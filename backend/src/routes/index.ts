import { Router } from "express";
import figureRouter from "./figure";
import forumRouter from "./forum";
import userRouter from "./user";

const router = Router();
router.use('/figure', figureRouter);
router.use('/user', userRouter);
router.use('/forum', forumRouter);

export default router;
