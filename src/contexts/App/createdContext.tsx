import { createContext } from "react";
import { AppContextProps } from "./AppContext";

export const AppContext = createContext<AppContextProps | undefined>(undefined);