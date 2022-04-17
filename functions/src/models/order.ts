import {props, Serializable} from "./util";

interface ItemQuantity {
    itemId: string
    quantity: number
}

export enum OrderStatus {
    New = "New",
    InProgress = "In Progress",
    Shipped = "Shipped",
    Finished = "Finished",
}

export interface OrderInterface {
    customerId: string
    items: ItemQuantity[]
    address: string
    status: OrderStatus
}

export class Order extends Serializable implements OrderInterface {
  customerId = "";
  items = [];
  address = "";
  status = OrderStatus.New;

  constructor(data: props) {
    super();
    Object.assign(this, super.getProps(data));
  }

  empty() {
    return new Order({});
  }
}
