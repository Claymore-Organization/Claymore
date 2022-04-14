import { props, Serializable } from "./util";

export interface UserInterface {
    username: string
    image: string
}

export class User extends Serializable {
    username = ''
    image = ''

    constructor(data: props) {
        super();
        Object.assign(this, super.getProps(data));
    }

    empty() {
        return new User({});
    }
}
