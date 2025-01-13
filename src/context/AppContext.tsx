import React, { SetStateAction, useMemo, useRef, useState } from "react";
import { CartProductAlias } from "../types/CartProductAlias";
import { CartQuantities } from "../types/CartQuantities";
import { Product } from "../types/Product";
import { AppContext } from "./createdContext";

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
  breadcrumbsLinkRef: React.RefObject<HTMLAnchorElement>;
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
  const breadcrumbsLinkRef = useRef<HTMLAnchorElement>(null);

  const contextValue = useMemo(
    () => ({
      error,
      setError,
      isProductPageOpened,
      setIsProductPageOpened,
      isMenuShown,
      setIsMenuShown,
      cartProducts,
      setCartProducts,
      activeCartStep,
      setActiveCartStep,
      recommendedPage,
      setRecommendedPage,
      favProducts,
      setFavProducts,
      cartQuantities,
      setCartQuantities,
      purchasedProducts,
      setPurchasedProducts,
      breadcrumbsLinkRef,
    }),
    [
      error,
      isProductPageOpened,
      isMenuShown,
      cartProducts,
      activeCartStep,
      recommendedPage,
      favProducts,
      cartQuantities,
      purchasedProducts,
    ]
  );

  return (
    <AppContext.Provider
      value={contextValue}
    >
      {children}
    </AppContext.Provider>
  );
}
