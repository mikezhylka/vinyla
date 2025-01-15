import { createContext } from "react";
import { CartContextProps } from "./CartContext";

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);
