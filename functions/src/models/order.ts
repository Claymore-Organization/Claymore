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

export class Order {
  id: string;
  customerId: string;
  items: ItemQuantity[];
  address: string;
  status: OrderStatus;

  constructor(id: string, customerId: string,
      items: ItemQuantity[], address: string, status: OrderStatus) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.address = address;
    this.status = status;
  }
}
