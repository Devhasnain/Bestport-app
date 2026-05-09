export interface ProductsListParams {
    search?:string;
    page?: number,
    limit?: number
}

export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: {
        path: string,
        mimetype: string,
        filename: string,
    },
    quantity: number;
    createdAt: Date
}
