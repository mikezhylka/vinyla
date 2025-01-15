import { useContext } from "react";
import { ProductContextProps } from "./ProductContext";
import { ProductContext } from "./createdContext";

export function useProductContext() {
  const context: ProductContextProps | undefined = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within an ProductProvider");
  }

  return context;
}