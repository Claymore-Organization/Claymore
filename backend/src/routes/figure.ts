import { Request, Response, Router } from "express";
import { Figure } from "../models/figure";

const figureRouter = Router();

figureRouter.get('/', [], async function (req: Request, res: Response) {
    const figureId = req.query.figureId?.toString();
    if (!figureId) {
        res.status(400).send('Param figureId is missing');
        return;
    }

    try {
        const figure = new Figure(figureId, 'Melina Figure (Elden Ring)', 'image URL', 69.99, 100);
        res.send(figure);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default figureRouter;
