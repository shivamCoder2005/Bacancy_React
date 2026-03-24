type Product = {
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
}


type Option = {
    skip: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string,
}

type ProductDataRespone = {
    products: Product[],
    limit: number,
    skip: number,
    total: number
}

export type { Product, Option,ProductDataRespone }