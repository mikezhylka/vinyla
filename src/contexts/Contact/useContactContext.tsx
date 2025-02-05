import { useContext } from "react";
import { ContactContextProps } from "./ContactContext";
import { ContactContext } from "./createdContext";

export function useContactContext() {
  const context: ContactContextProps | undefined = useContext(ContactContext);

  if (!context) {
    throw new Error("useContactContext must be used within an AppProvider");
  }

  return context;
}