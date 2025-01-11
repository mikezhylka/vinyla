import { SetStateAction, useEffect, useState } from "react";
import { useAppContext } from "../../../../../../context/useAppContext";
import { normalizePrice } from "../../../handlers";
import { RadioInput } from "../../RadioInput/RadioInput";
import { CouponSection } from "./components/CouponSection";
import styles from "./index.module.scss";

import { useWindowSize } from "@uidotdev/usehooks";
import { ProductsTable } from "../../../../../blocks/ProductsTable";

type Props = {
  shippingPrice: number;
  setShippingPrice: React.Dispatch<SetStateAction<number>>;
  total: number;
  subtotal: number;
  setIsPickUpChosen: React.Dispatch<SetStateAction<boolean>>;
};

export const StepOneSection: React.FC<Props> = ({
  shippingPrice,
  setShippingPrice,
  total,
  subtotal,
  setIsPickUpChosen,
}) => {
  const { setActiveCartStep } = useAppContext();
  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const windowSize = useWindowSize();
  const { width } = windowSize;

  useEffect(() => {
    if (width) {
      setIsOnDesktop(width >= 1440);
    }
  }, [width]);

  return (
    <div className="step-1-wrap">
      <form
        action=""
        className={styles["cart-form"]}
        onSubmit={(e) => e.preventDefault()}
      >
        <ProductsTable />
        {!isOnDesktop && <CouponSection />}
        <section className={styles["cart-form__summary"]}>
          <div className={styles["cart-form__summary-inputs"]}>
            <RadioInput
              title="Free shipping"
              pricing="0"
              setShippingPrice={setShippingPrice}
              setIsPickUpChosen={setIsPickUpChosen}
            />
            <RadioInput
              title="Express shipping"
              pricing="15"
              setShippingPrice={setShippingPrice}
              setIsPickUpChosen={setIsPickUpChosen}
            />
            <RadioInput
              title="Pick Up"
              pricing="-10"
              setShippingPrice={setShippingPrice}
              setIsPickUpChosen={setIsPickUpChosen}
            />
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
          <button
            className={styles["cart-form__checkout"]}
            onClick={() => {
              setActiveCartStep((prev) => prev + 1);
            }}
          >
            Checkout
          </button>
        </section>
        {isOnDesktop && <CouponSection />}
      </form>
    </div>
  );
};
