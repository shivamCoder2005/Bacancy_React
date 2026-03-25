type Product = {
    id: number
    thumbnail: string;
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
    category: string
}

type ProductDataRespone = {
    products: Product[],
    limit: number,
    skip: number,
    total: number
}

type CartProduct = Omit<Product, "thumbnail" | "rating" | "stock"> & { quantity: number }



type CartContext = {
    cart: CartProduct[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    updateCart: (id: number, newQuantity: number) => void
}


export type { Product, Option, ProductDataRespone, CartContext, CartProduct }