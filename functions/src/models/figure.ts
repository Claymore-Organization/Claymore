import { props, Serializable } from "./util"

export interface FigureInterface {
    name: string
    image: string
    price: number
    stock: number
    present: boolean
}

export class Figure extends Serializable implements FigureInterface {
    name = ''
    image = ''
    price = 0
    stock = 0
    present = false

    constructor(data: props) {
        super();
        Object.assign(this, super.getProps(data));
    }

    empty() {
        return new Figure({});
    }
}
