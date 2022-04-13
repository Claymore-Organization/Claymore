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
const forum_1 = require("../models/forum");
const forumRouter = (0, express_1.Router)();
forumRouter.get('/', [], function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const forumId = (_a = req.query.forumId) === null || _a === void 0 ? void 0 : _a.toString();
        if (!forumId) {
            res.status(400).send('Param forumId is missing');
            return;
        }
        try {
            const forum = new forum_1.ForumThread(forumId, forum_1.ForumStatus.New, 'Title');
            res.send(forum);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
});
exports.default = forumRouter;
