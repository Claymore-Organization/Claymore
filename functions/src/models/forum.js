"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumThread = exports.ForumPost = exports.ForumStatus = void 0;
var ForumStatus;
(function (ForumStatus) {
    ForumStatus["New"] = "New";
    ForumStatus["InProgress"] = "In Progress";
    ForumStatus["Finished"] = "Finished";
})(ForumStatus = exports.ForumStatus || (exports.ForumStatus = {}));
class ForumPost {
    constructor(id, authorId, datePosted, content) {
        this.id = id;
        this.authorId = authorId;
        this.datePosted = datePosted;
        this.content = content;
    }
}
exports.ForumPost = ForumPost;
class ForumThread {
    constructor(id, status, title) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.posts = [];
    }
}
exports.ForumThread = ForumThread;
