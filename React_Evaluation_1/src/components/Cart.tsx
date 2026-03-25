import { useCartContext } from "./CartContextProvider";

const Cart = () => {
  const { cart, removeFromCart, updateCart } = useCartContext();

  let total = 0;
  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <div className="cart-list">
            {cart.map((item) => {
              total += item.quantity * item.price;

              return (
                <div key={item.id} className="cart-card">
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p className="category">{item.category}</p>
                    <p className="price">₹{item.price}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity-control">
                      <button
                        onClick={() => updateCart(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateCart(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-total">
            <h2>Total: ₹{Math.ceil(total)}</h2>
          </div>
        </>
      ) : (
        <div className="empty-cart">Please Add Items To Cart</div>
      )}
    </div>
  );
};

export default Cart;
