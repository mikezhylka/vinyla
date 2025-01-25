import { useEffect, useState } from "react";
import { normalizePrice } from "../../../handlers";

import { ProductsTable } from "../../../../../blocks/ProductsTable";
import { RadioInput } from "../../RadioInput";
import { CouponSection } from "./components/CouponSection";

import { useWindowSize } from "@uidotdev/usehooks";
import { useCartContext } from "../../../../../../contexts/Cart/useCartContext";

import { desktopWidth } from "../../../../../../constants/breakpoints";
import styles from "./index.module.scss";

type Props = {
  total: number;
};

export const StepOneSection: React.FC<Props> = ({ total }) => {
  const { subtotal, shippingPrice, setActiveCartStep } = useCartContext();
  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width) {
      setIsOnDesktop(width >= desktopWidth);
    }
  }, [width]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActiveCartStep(2);
  }

  return (
    <div className="step-1-wrap">
      <form
        action="POST"
        className={styles["cart-form"]}
        onSubmit={handleSubmit}
      >
        <ProductsTable />
        {!isOnDesktop && <CouponSection />}
        <section className={styles["cart-form__summary"]}>
          <div className={styles["cart-form__summary-inputs"]}>
            <RadioInput title="Free shipping" pricing="0" />
            <RadioInput title="Express shipping" pricing="15" />
            <RadioInput title="Pick Up" pricing="-10" />
          </div>
          <div className={styles["cart-form__summary-prices"]}>
            <div className={styles["cart-form__summary-subtotal"]}>
              <p className={styles["cart-form__summary-subtotal-title"]}>
                Subtotal
              </p>
              <p className={styles["cart-form__summary-subtotal-price"]}>
                {normalizePrice(subtotal)}
              </p>
            </div>
            <div className={styles["cart-form__summary-delivery"]}>
              <p className={styles["cart-form__summary-delivery-title"]}>
                Delivery
              </p>
              <p className={styles["cart-form__summary-delivery-price"]}>
                {normalizePrice(shippingPrice)}
              </p>
            </div>
            <div className={styles["cart-form__summary-total"]}>
              <p className={styles["cart-form__summary-total-title"]}>Total</p>
              <p className={styles["cart-form__summary-total-price"]}>
                {normalizePrice(total)}
              </p>
            </div>
          </div>
          <button type="submit" className={styles["cart-form__checkout"]}>
            Checkout
          </button>
        </section>
        {isOnDesktop && <CouponSection />}
      </form>
    </div>
  );
};
