import { useContext } from "react";
import { CartContextProps } from "./CartContext";
import { CartContext } from "./createdContext";

export function useCartContext() {
  const context: CartContextProps | undefined = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within an CartProvider");
  }

  return context;
}