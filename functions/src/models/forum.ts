import { props, Serializable } from "./util"

export enum ForumStatus {
    New = 'New',
    InProgress = 'In Progress',
    Finished = 'Finished',
}

export interface ForumPostInterface {
    authorId: string
    datePosted: Date
    content: string
}

export class ForumPost extends Serializable implements ForumPostInterface {
    authorId = ''
    datePosted = new Date()
    content = ''

    constructor(data: props) {
        super();
        Object.assign(this, super.getProps(data));
    }

    empty() {
        return new ForumPost({});
    }
}

export interface ForumThreadInterface {
    title: string
    status: ForumStatus
    posts: ForumPostInterface[]
}

export class ForumThread extends Serializable implements ForumThreadInterface {
    title = ''
    status = ForumStatus.New
    posts: ForumPostInterface[] = []

    constructor(data: props) {
        super();
        Object.assign(this, super.getProps(data));
    }

    empty() {
        return new ForumThread({});
    }

    addPost(post: ForumPost) {
        this.posts.push(post);
    }
}
