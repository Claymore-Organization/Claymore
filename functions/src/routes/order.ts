import {Request, Response} from "express";
import {Order} from "../models/order";
import {getDatabase, ref, get, child, update, push} from "firebase/database";
import firebase from "../../firebase";

export async function getOrders(req: Request, res: Response) {
  const orderId = req.query.orderId?.toString();
  const userId = req.query.userId?.toString();
  const db = getDatabase(firebase);

  const getOrder = async (targetOrderId: string) => {
    let data = {};
    await get(child(ref(db), `order/${targetOrderId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
      }
    });
    return new Order(data);
  };

  try {
    if (orderId) {
      const data = await getOrder(orderId);
      if (data) {
        res.send({[orderId]: data});
      } else {
        res.status(404).send("Order not found");
      }
    } else if (userId) {
      get(child(ref(db), `user/${userId}/orders`)).then(async (snapshot) => {
        if (snapshot.exists()) {
          const orders = snapshot.val();
          const userOrderPromises = [];
          for (const orderId of orders) {
            userOrderPromises.push(getOrder(orderId));
          }
          const userOrders = await Promise.all(userOrderPromises);
          const outputDict = new Map<string, Order>();
          let ind = 0;
          for (const orderId of orders) {
            outputDict.set(orderId, userOrders[ind]);
            ind += 1;
          }
          res.send(Object.fromEntries(outputDict));
        } else {
          res.status(404).send("User not found");
        }
      });
    } else {
      get(ref(db, "order")).then((snapshot) => {
        res.send(snapshot.val());
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function postOrder(req: Request, res: Response) {
  let orderId = req.query.orderId?.toString();
  try {
    const db = getDatabase(firebase);
    const order = new Order(req.body);
    if (orderId == undefined) {
      // Create a new order instead of just updating
      const newoid = push(child(ref(db), "order")).key;
      if (newoid == null) { // basically this can't happen
        res.status(500).send("DB could not make a new order id");
        return;
      }
      orderId = newoid;

      // Need to update the user this order was made for
      const userId = order.customerId;
      const userOrderRef = ref(db, `user/${userId}/orders`);
      const customeroid = push(userOrderRef).key;
      if (customeroid == null) {
        res.status(500).send("DB could attach a new order to a customer");
        return;
      }
      update(userOrderRef, {[customeroid]: orderId});
    }
    // Update the db of orders
    const data = {
      [orderId]: order,
    };
    update(ref(db, "order"), data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
