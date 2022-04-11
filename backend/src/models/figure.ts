export class Figure {
    id: string
    name: string
    image: string
    price: number
    stock: number
    present: boolean

    constructor(id: string, name: string, image: string, price: number, stock: number, present: boolean) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.present = present;
    }
}
