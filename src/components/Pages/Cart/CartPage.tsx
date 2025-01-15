import { useWindowSize } from "@uidotdev/usehooks";
import { ReactElement, useEffect } from "react";
import { useCartContext } from "../../../contexts/Cart/useCartContext";

import { Breadcrumbs } from "../../blocks/Breadcrumbs";
import { CartStep } from "../../blocks/CartStep";
import { cartSteps } from "../../blocks/CartStep/config";
import { EmptyCart } from "./components/EmptyCart/EmptyCart";
import { StepOneSection } from "./components/Steps/StepOneSection";
import { StepThreeSection } from "./components/Steps/StepThreeSection";
import { StepTwoSection } from "./components/Steps/StepTwoSection";

import { CartStep as CartStepType } from "../../../types/CartStep";

import styles from "./index.module.scss";

export const CartPage: React.FC = () => {
  const {
    cartProducts,
    cartQuantities,
    activeCartStep,
    purchasedProducts,
    shippingPrice,
    subtotal,
    setSubtotal,
    isCartEmpty,
    setIsCartEmpty,
    setActiveCartStep,
    isFormSubmited,
  } = useCartContext();

  const windowSize = useWindowSize();
  const width: number | null = windowSize.width;
  const total: number = subtotal + shippingPrice;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      if (!isFormSubmited) {
        setActiveCartStep(1);
      }
    };
    // rule below is used because adding isFormDisabled in dependency array adds redundant rerenders and breaks code
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveCartStep]);

  useEffect(() => {
    const calculateSubtotal: number = Object.values(cartProducts).reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    setSubtotal(calculateSubtotal);
  }, [cartProducts, cartQuantities, setSubtotal]);

  useEffect(() => {
    setIsCartEmpty(
      !Object.keys(cartProducts).length &&
        !Object.keys(purchasedProducts).length
    );
  }, [cartProducts, purchasedProducts, setIsCartEmpty]);

  if (isCartEmpty) {
    return (
      <main className={styles.main}>
        <EmptyCart />
      </main>
    );
  }

  function handleShowingStepSection(): ReactElement | null {
    switch (activeCartStep) {
      case 1:
        return <StepOneSection total={total} />;
      case 2:
        return <StepTwoSection total={total} />;
      case 3:
        return <StepThreeSection />;
      default:
        return null;
    }
  }

  // hide not active cart steps on mobile
  const visibleCartSteps: CartStepType[] =
    width && width < 640 ? cartSteps.slice(activeCartStep - 1) : cartSteps;

  return (
    <main className={styles.main}>
      <Breadcrumbs />
      <div className={styles["cart-steps"]}>
        {visibleCartSteps.map((currentStep) => (
          <CartStep key={currentStep.stepNumber} currentStep={currentStep} />
        ))}
      </div>
      {handleShowingStepSection()}
    </main>
  );
};
