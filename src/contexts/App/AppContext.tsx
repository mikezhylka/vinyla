import { useWindowSize } from "@uidotdev/usehooks";
import React, { SetStateAction, useRef, useState } from "react";
import { Product } from "../../types/Product";
import { AppContext } from "./createdContext";

export type AppContextProps = {
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  favProducts: Product[] | null;
  setFavProducts: React.Dispatch<SetStateAction<Product[]>>;
  breadcrumbsLinkRef: React.RefObject<HTMLAnchorElement>;
  isOnDesktop: boolean;
  isSubmitDisabled: boolean;
  setIsSubmitDisabled: React.Dispatch<SetStateAction<boolean>>;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { width } = useWindowSize();

  const [error, setError] = useState(false);
  const breadcrumbsLinkRef = useRef<HTMLAnchorElement>(null);
  const [favProducts, setFavProducts] = useState<Product[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isOnDesktop = width ? width >= 1440 : false;

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        favProducts,
        setFavProducts,
        breadcrumbsLinkRef,
        isOnDesktop,
        isSubmitDisabled,
        setIsSubmitDisabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
