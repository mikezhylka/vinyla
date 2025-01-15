import { createContext } from "react";
import { ProductContextProps } from "./ProductContext";

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);
