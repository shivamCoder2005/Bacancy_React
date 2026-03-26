import CartCard from "./CartCard";
import { useCartContext } from "./CartContextProvider";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useCartContext();

  let total = 0;
  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <div className="cart-list">
            {cart.map((item) => {
              total += item.quantity * item.price;
              return (
                <CartCard
                  key={item.id}
                  cart={item}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              );
            })}
          </div>

          <div className="cart-total">
            <h2>Total: ${Math.ceil(total)}</h2>
          </div>
        </>
      ) : (
        <div className="empty-cart">Please Add Items To Cart</div>
      )}
    </div>
  );
};

export default Cart;
