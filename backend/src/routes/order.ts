import { Request, Response, Router } from "express";
import { Order, OrderStatus } from "../models/order";

const orderRouter = Router();

orderRouter.get('/', [], async function (req: Request, res: Response) {
    const orderId = req.query.orderId?.toString();
    if (!orderId) {
        res.status(400).send('Param orderId is missing');
        return;
    }

    try {
        const order = new Order(orderId, 'customerId', [], 'address', OrderStatus.New);
        res.send(order);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default orderRouter;
