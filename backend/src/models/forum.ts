export class ForumPost {
    id: string
    authorId: string
    datePosted: Date
    content: string

    constructor(id: string, authorId: string, datePosted: Date, content: string) {
        this.id = id;
        this.authorId = authorId;
        this.datePosted = datePosted;
        this.content = content;
    }
}

export class ForumThread {
    id: string
    status: string
    title: string
    posts: ForumPost[]

    constructor(id: string, status: string, title: string) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.posts = [];
    }
}
