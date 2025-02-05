import { createContext } from "react";
import { ContactContextProps } from "./ContactContext";

export const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);
