import React, { SetStateAction, useState } from "react";
import { ProductContext } from "./createdContext";

export type ProductContextProps = {
  isProductPageOpened: boolean;
  setIsProductPageOpened: React.Dispatch<SetStateAction<boolean>>;
  recommendedPage: number;
  setRecommendedPage: React.Dispatch<SetStateAction<number>>;
  isMenuShown: boolean;
  setIsMenuShown: React.Dispatch<SetStateAction<boolean>>;
  recProdsPerPage: number;
  setRecProdsPerPage: React.Dispatch<SetStateAction<number>>;
  isAddedToCart: boolean;
  setIsAddedToCart: React.Dispatch<SetStateAction<boolean>>;
  isProductInCart: boolean;
  setIsProductInCart: React.Dispatch<SetStateAction<boolean>>;
  pageProductQty: number;
  setPageProductQty: React.Dispatch<SetStateAction<number>>;
};

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [isProductPageOpened, setIsProductPageOpened] = useState(false);
  const [recommendedPage, setRecommendedPage] = useState(1);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [recProdsPerPage, setRecProdsPerPage] = useState(2);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [pageProductQty, setPageProductQty] = useState(1);

  return (
    <ProductContext.Provider
      value={{
        isProductPageOpened,
        setIsProductPageOpened,
        recommendedPage,
        setRecommendedPage,
        isMenuShown,
        setIsMenuShown,
        recProdsPerPage,
        setRecProdsPerPage,
        isAddedToCart,
        setIsAddedToCart,
        isProductInCart,
        setIsProductInCart,
        pageProductQty,
        setPageProductQty,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
