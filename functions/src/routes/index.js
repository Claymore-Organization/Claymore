"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const figure_1 = __importDefault(require("./figure"));
const forum_1 = __importDefault(require("./forum"));
const order_1 = __importDefault(require("./order"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use('/figure', figure_1.default);
router.use('/user', user_1.default);
router.use('/forum', forum_1.default);
router.use('/order', order_1.default);
exports.default = router;
