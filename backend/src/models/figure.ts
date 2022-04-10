export class Figure {
    id: string
    name: string
    image: string
    price: number
    stock: number

    constructor(id: string, name: string, image: string, price: number, stock: number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }
}
