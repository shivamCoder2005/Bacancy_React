import type { CartProduct } from "../types";
import { memo } from "react";

type Props = {
  cart: CartProduct;
  updateCart: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartCard = memo(({ cart,updateCart,removeFromCart }: Props) => {
  console.log(`${cart.title} is re rendering`);
  return (
    <>
      <div key={cart.id} className="cart-card">
        <div className="cart-info">
          <h3>{cart.title}</h3>
          <p className="category">{cart.category}</p>
          <p className="price">${cart.price}</p>
        </div>

        <div className="cart-actions">
          <div className="quantity-control">
            <button onClick={() => updateCart(cart.id, cart.quantity - 1)}>
              −
            </button>
            <span>{cart.quantity}</span>
            <button onClick={() => updateCart(cart.id, cart.quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(cart.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
});

export default CartCard;
