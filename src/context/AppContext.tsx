import React, { SetStateAction, useState } from "react";
// import { products as PRODUCTS_API } from "../api/products";
// import { CartProduct } from "../types/CartProduct";
import { CartProductAlias } from "../types/CartProductAlias";
import { CartQuantities } from "../types/CartQuantities";
import { Product } from "../types/Product";
import { AppContext } from "./createdContext";

// type ProductQuantity = {
//   productId: number;
//   quantity: number;
// }

export type AppContextProps = {
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  isProductPageOpened: boolean;
  setIsProductPageOpened: React.Dispatch<SetStateAction<boolean>>;
  favProducts: Product[] | null;
  setFavProducts: React.Dispatch<SetStateAction<Product[]>>;
  recommendedPage: number;
  setRecommendedPage: React.Dispatch<SetStateAction<number>>;
  isMenuShown: boolean;
  setIsMenuShown: React.Dispatch<SetStateAction<boolean>>;
  cartProducts: CartProductAlias;
  setCartProducts: React.Dispatch<SetStateAction<CartProductAlias>>;
  activeCartStep: number;
  setActiveCartStep: React.Dispatch<SetStateAction<number>>;
  cartQuantities: CartQuantities;
  setCartQuantities: React.Dispatch<SetStateAction<CartQuantities>>;
  purchasedProducts: CartProductAlias;
  setPurchasedProducts: React.Dispatch<SetStateAction<CartProductAlias>>;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState(false);
  const [isProductPageOpened, setIsProductPageOpened] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [cartProducts, setCartProducts] = useState<CartProductAlias>({});
  const [activeCartStep, setActiveCartStep] = useState(1);

  const [recommendedPage, setRecommendedPage] = useState(1);
  const [favProducts, setFavProducts] = useState<Product[]>([]);
  const [cartQuantities, setCartQuantities] = useState<CartQuantities>({});
  const [purchasedProducts, setPurchasedProducts] = useState<CartProductAlias>({});

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        isProductPageOpened,
        setIsProductPageOpened,
        favProducts,
        setFavProducts,
        recommendedPage,
        setRecommendedPage,
        isMenuShown,
        setIsMenuShown,
        cartProducts,
        setCartProducts,
        activeCartStep,
        setActiveCartStep,
        cartQuantities,
        setCartQuantities,
        purchasedProducts,
        setPurchasedProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
