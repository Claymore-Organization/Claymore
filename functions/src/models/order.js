"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["New"] = "New";
    OrderStatus["InProgress"] = "In Progress";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Finished"] = "Finished";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
class Order {
    constructor(id, customerId, items, address, status) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.address = address;
        this.status = status;
    }
}
exports.Order = Order;
