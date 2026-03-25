import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartContext, CartProduct, Product } from "../types";

type Props = {
  children: ReactNode;
};

const CartContext = createContext<CartContext | null>(null);

export function useCartContext() {
  const result = useContext(CartContext);
  if (!result) {
    throw new Error("can't access cart value outside provider");
  }
  return result;
}

const CartContextProvider = ({ children }: Props) => {
  const [cartState, setCartState] = useState<CartProduct[]>([]);

  function addToCart(product: Product) {
    const result = cartState.find((item) => item.id === product.id);
    if (result) {
      updateCart(product.id, result.quantity + 1);
      return;
    }
    setCartState((prev) => [...prev, { ...product, quantity: 1 }]);
  }

  function removeFromCart(id: number) {
    setCartState((prev) => prev.filter((item) => item.id !== id));
  }

  function updateCart(id: number, newQuantity: number) {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  return (
    <>
      <CartContext.Provider
        value={{ cart: cartState, addToCart, removeFromCart, updateCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartContextProvider;
