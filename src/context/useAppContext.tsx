import { useContext } from "react";
import { AppContextProps } from "./AppContext";
import { AppContext } from "./createdContext";

export function useAppContext() {
  const context: AppContextProps | undefined = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}