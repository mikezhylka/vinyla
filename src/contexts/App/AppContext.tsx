import React, { SetStateAction, useRef, useState } from "react";
import { Product } from "../../types/Product";
import { AppContext } from "./createdContext";

export type AppContextProps = {
  error: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
  favProducts: Product[] | null;
  setFavProducts: React.Dispatch<SetStateAction<Product[]>>;
  breadcrumbsLinkRef: React.RefObject<HTMLAnchorElement>;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState(false);
  const breadcrumbsLinkRef = useRef<HTMLAnchorElement>(null);
  const [favProducts, setFavProducts] = useState<Product[]>([]);

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        favProducts,
        setFavProducts,
        breadcrumbsLinkRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
