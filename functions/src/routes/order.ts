import {Request, Response} from "express";
import {Order, OrderStatus} from "../models/order";
import {TEMP_USER_DB} from "./user";

// const orderRouter = Router();

const TEMP_ORDER_DB: { [key:string]: Order } = {
  "order1": new Order({
    customerId: "user1",
    items: [{itemId: "figure1", quantity: 1}], address: "Address",
    status: OrderStatus.New,
  }),
  "order2": new Order({
    customerId: "user2",
    items: [{itemId: "figure2", quantity: 2}], address: "Address",
    status: OrderStatus.InProgress,
  }),
};

export async function getOrders(req: Request, res: Response){
  const orderId = req.query.orderId?.toString();
  const userId = req.query.userId?.toString();
  try {
    if (orderId) {
      // TODO: add query to find order by id
      const order = TEMP_ORDER_DB[orderId];
      if (order) {
        const data = {
          [orderId]: order,
        };
        res.send(data);
      } else {
        res.status(404).send("Order not found");
      }
    } else if (userId) {
      // TODO: add query to find order by user
      const orders = TEMP_USER_DB[userId]?.orders;
      if (orders) {
        const data = Object.assign(
            {},
            ...orders.map((order) => ({[order]: TEMP_ORDER_DB[order]}))
        );
        res.send(data);
      } else {
        res.status(404).send("User not found");
      }
    } else {
      // TODO: add query to find all orders
      const orders = TEMP_ORDER_DB;
      res.send(orders);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// orderRouter.get("/", [], async function(req: Request, res: Response) {
//   const orderId = req.query.orderId?.toString();
//   const userId = req.query.userId?.toString();
//   try {
//     if (orderId) {
//       // TODO: add query to find order by id
//       const order = TEMP_ORDER_DB[orderId];
//       if (order) {
//         const data = {
//           [orderId]: order,
//         };
//         res.send(data);
//       } else {
//         res.status(404).send("Order not found");
//       }
//     } else if (userId) {
//       // TODO: add query to find order by user
//       const orders = TEMP_USER_DB[userId]?.orders;
//       if (orders) {
//         const data = Object.assign(
//             {},
//             ...orders.map((order) => ({[order]: TEMP_ORDER_DB[order]}))
//         );
//         res.send(data);
//       } else {
//         res.status(404).send("User not found");
//       }
//     } else {
//       // TODO: add query to find all orders
//       const orders = TEMP_ORDER_DB;
//       res.send(orders);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

export async function postOrder(req: Request, res: Response){
  const orderId = req.query.orderId?.toString();
  if (orderId) {
    // TODO: Update existing order
    // Update existing order
    const order = TEMP_ORDER_DB[orderId];
    if (order) {
      Object.assign(order, req.body);
      const newOrder = new Order(order);
      const data = {
        [orderId]: newOrder,
      };
      res.send(data);
    } else {
      res.status(404).send("Order not found");
    }
  } else {
    // TODO: insert new order, update associated user
    // New order
    const newOrder = new Order(req.body);
    const orderId = "order3";
    const data = {
      [orderId]: newOrder,
    };
    res.send(data);
  }
}

// orderRouter.post("/", [], async function(req: Request, res: Response) {
//   const orderId = req.query.orderId?.toString();
//   if (orderId) {
//     // TODO: Update existing order
//     // Update existing order
//     const order = TEMP_ORDER_DB[orderId];
//     if (order) {
//       Object.assign(order, req.body);
//       const newOrder = new Order(order);
//       const data = {
//         [orderId]: newOrder,
//       };
//       res.send(data);
//     } else {
//       res.status(404).send("Order not found");
//     }
//   } else {
//     // TODO: insert new order, update associated user
//     // New order
//     const newOrder = new Order(req.body);
//     const orderId = "order3";
//     const data = {
//       [orderId]: newOrder,
//     };
//     res.send(data);
//   }
// });

// export default orderRouter;
