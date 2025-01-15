import React, { SetStateAction, useState } from "react";
import {
  FormInitValues,
  FormValuesType,
} from "../../components/pages/Cart/components/Steps/StepTwoSection/config";
import { CartProductAlias } from "../../types/CartProductAlias";
import { CartQuantities } from "../../types/CartQuantities";
import { CartContext } from "./createdContext";

export type CartContextProps = {
  activeCartStep: number;
  setActiveCartStep: React.Dispatch<SetStateAction<number>>;
  cartProducts: CartProductAlias;
  setCartProducts: React.Dispatch<SetStateAction<CartProductAlias>>;
  cartQuantities: CartQuantities;
  setCartQuantities: React.Dispatch<SetStateAction<CartQuantities>>;
  purchasedProducts: CartProductAlias;
  setPurchasedProducts: React.Dispatch<SetStateAction<CartProductAlias>>;
  shippingPrice: number;
  setShippingPrice: React.Dispatch<SetStateAction<number>>;
  subtotal: number;
  setSubtotal: React.Dispatch<SetStateAction<number>>;
  isPickUpChosen: boolean;
  setIsPickUpChosen: React.Dispatch<SetStateAction<boolean>>;
  isPayingByCard: boolean;
  setIsPayingByCard: React.Dispatch<SetStateAction<boolean>>;
  isCartEmpty: boolean;
  setIsCartEmpty: React.Dispatch<SetStateAction<boolean>>;
  confirmationFormState: FormValuesType;
  setConfirmationFormState: React.Dispatch<SetStateAction<FormValuesType>>;
  isFormSubmited: boolean;
  setIsFormSubmited: React.Dispatch<SetStateAction<boolean>>;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [activeCartStep, setActiveCartStep] = useState(1);
  const [cartProducts, setCartProducts] = useState<CartProductAlias>({});
  const [cartQuantities, setCartQuantities] = useState<CartQuantities>({});
  const [purchasedProducts, setPurchasedProducts] = useState<CartProductAlias>(
    {}
  );
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isPickUpChosen, setIsPickUpChosen] = useState(false);
  const [isPayingByCard, setIsPayingByCard] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [confirmationFormState, setConfirmationFormState] =
    useState<FormValuesType>(FormInitValues);
    const [isFormSubmited, setIsFormSubmited] = useState(false);

  return (
    <CartContext.Provider
      value={{
        activeCartStep,
        setActiveCartStep,
        cartProducts,
        setCartProducts,
        cartQuantities,
        setCartQuantities,
        purchasedProducts,
        setPurchasedProducts,
        shippingPrice,
        setShippingPrice,
        subtotal,
        setSubtotal,
        isPickUpChosen,
        setIsPickUpChosen,
        isPayingByCard,
        setIsPayingByCard,
        isCartEmpty,
        setIsCartEmpty,
        confirmationFormState,
        setConfirmationFormState,
        isFormSubmited,
        setIsFormSubmited,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
