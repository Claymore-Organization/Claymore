"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/', [], function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = (_a = req.query.orderId) === null || _a === void 0 ? void 0 : _a.toString();
        if (!orderId) {
            res.status(400).send('Param orderId is missing');
            return;
        }
        try {
            const order = new order_1.Order(orderId, 'customerId', [], 'address', order_1.OrderStatus.New);
            res.send(order);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
});
exports.default = orderRouter;
