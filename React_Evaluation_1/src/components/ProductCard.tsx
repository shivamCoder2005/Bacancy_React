import React from "react";
import type { CartProduct, Product } from "../types";

type Props = {
  data: Product;
  addToCart: (product: Product) => void;
  updateCart: (id: number, quantity: number) => void;
  cartItem: CartProduct | undefined;
};

const ProductCard = React.memo(
  ({ data, addToCart, updateCart, cartItem }: Props) => {
    const { thumbnail, title, category, price, rating, stock } = data;
    function incQuant() {
      if (cartItem) updateCart(data.id, cartItem.quantity + 1);
    }

    function decQuant() {
      if (cartItem) updateCart(data.id, cartItem.quantity - 1);
    }

    return (
      <div className="card">
        <img src={thumbnail} alt="product_img" />
        <h3>{title}</h3>
        <ul>
          <li>Id :- {data.id}</li>
          <li>Category :- {category}</li>
          <li>Price :- {price}</li>
          <li>Rating :- {rating}</li>
          <li>Stock :- {stock}</li>
          {!cartItem && (
            <button onClick={() => addToCart(data)}>Add To Cart</button>
          )}
          {cartItem && (
            <div>
              <button onClick={decQuant}>-</button>
              {cartItem.quantity}
              <button onClick={incQuant}>+</button>
            </div>
          )}
        </ul>
      </div>
    );
  },
);

export default ProductCard;
