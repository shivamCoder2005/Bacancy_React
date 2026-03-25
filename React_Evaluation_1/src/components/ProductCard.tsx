import React, { useState } from "react";
import type { Product } from "../types";

type Props = {
  data: Product;
  addToCart: (product: Product) => void;
  updateCart: (id: number, quantity: number) => void;
};

const ProductCard = React.memo(({ data, addToCart, updateCart }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const { thumbnail, title, category, price, rating, stock } = data;

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
        {quantity < 1 ? (
          <button
            onClick={() => {
              setQuantity(1);
              addToCart(data);
            }}
          >
            Add To Cart
          </button>
        ) : (
          <div>
            <button
              onClick={() => {
                updateCart(data.id, quantity - 1);
                setQuantity((prev) => prev - 1);
              }}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                updateCart(data.id, quantity + 1);
                setQuantity((prev) => prev + 1);
              }}
            >
              +
            </button>
          </div>
        )}
      </ul>
    </div>
  );
});

export default ProductCard;
