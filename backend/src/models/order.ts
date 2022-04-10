interface ItemQuantity {
    itemId: string
    quantity: number
}

export class Order {
    id: string
    customerId: string
    items: ItemQuantity[]
    address: string
    status: string

    constructor(id: string, customerId: string, items: ItemQuantity[], address: string, status: string) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.address = address;
        this.status = status;
    }
}
