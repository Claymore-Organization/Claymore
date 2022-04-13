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
const user_1 = require("../models/user");
const userRouter = (0, express_1.Router)();
userRouter.get('/', [], function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
        if (!userId) {
            res.status(400).send('Param userId is missing');
            return;
        }
        try {
            const user = new user_1.User(userId, 'username', 'image URL');
            res.send(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
});
exports.default = userRouter;
