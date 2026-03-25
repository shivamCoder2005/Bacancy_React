import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { CartContext, CartProduct, Product } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const { data: cartState, setData: setCartState } = useLocalStorage<
    CartProduct[]
  >([], "cart");

  const addToCart = useCallback((product: Product) => {
    setCartState((prev) => {
      const result = prev.find((item) => item.id === product.id);
      if (!result) return [...prev, { ...product, quantity: 1 }];
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartState((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateCart = useCallback((id: number, newQuantity: number) => {
    setCartState((prev) => {
      if (newQuantity < 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      );
    });
  }, []);

  

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
