export class ForumPost {
    id: string
    authorId: string
    content: string

    constructor(id: string, authorId: string, content: string) {
        this.id = id;
        this.authorId = authorId;
        this.content = content;
    }
}

export class ForumThread {
    id: string
    posts: ForumPost[]

    constructor(id: string) {
        this.id = id;
        this.posts = [];
    }
}
