import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useCartContext } from "../../../../../../contexts/Cart/useCartContext";
import { useScroll } from "../../../../../../hooks/useScroll";
import { ProductsTable } from "../../../../../blocks/ProductsTable/ProductsTable";
import { normalizePrice } from "../../../handlers";
import { CartProduct } from "../../CartProduct/CartProduct";
import { Input } from "../../Input";
import { RadioInput } from "../../RadioInput/RadioInput";
import { FormInitValues } from "./config";
import styles from "./index.module.scss";

type Props = {
  total: number;
};

export const StepTwoSection: React.FC<Props> = ({ total }) => {
  const {
    confirmationFormState,
    setConfirmationFormState,
    cartProducts,
    setCartProducts,
    setCartQuantities,
    setPurchasedProducts,
    isPayingByCard,
    shippingPrice,
    subtotal,
    isPickUpChosen,
    setActiveCartStep,
    setIsFormSubmited,
  } = useCartContext();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { width } = useWindowSize();
  const onDesktop = width && width > 1440;
  const onTablet = width && width >= 640 && !onDesktop;

  useScroll({options: {top: 0, behavior: "instant"}});

  useEffect(() => {
    const allInputsFilled: boolean = Object.values(confirmationFormState).every(
      (input) => !input.error.length && input.value.length
    );

    setIsSubmitDisabled(!allInputsFilled);
  }, [confirmationFormState]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPurchasedProducts(cartProducts);
    setCartProducts({});
    setCartQuantities({});
    setIsFormSubmited(true);
    setActiveCartStep(3);
    setConfirmationFormState({ ...FormInitValues });
  }

  return (
    <div className={styles["step-two-wrap"]}>
      <form
        action="POST"
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <section
          className={cn(
            styles["form__contact-information"],
            styles["form__section"]
          )}
        >
          <h4
            className={cn(
              styles["form__contact-information-title"],
              styles["form__section-title"]
            )}
          >
            Contact Information
          </h4>
          {onDesktop ? ( // wrap inputs to have two of them in one line
            <div className={styles["form__section-inputs-wrap"]}>
              <Input type="text" title="First name" />
              <Input type="text" title="Last name" />
            </div>
          ) : (
            <>
              <Input type="text" title="First name" />
              <Input type="text" title="Last name" />
            </>
          )}
          <Input type="tel" title="Phone number" />
          <Input type="email" title="Email" />
        </section>

        {!isPickUpChosen && (
          <section
            className={cn(
              styles["form__shipping-address"],
              styles["form__section"]
            )}
          >
            <h4
              className={cn(
                styles["form__shipping-address-title"],
                styles["form__section-title"]
              )}
            >
              Shipping Address
            </h4>
            <Input type="text" title="Country" />
            <Input type="text" title="Town/City" />
            <Input type="text" title="Street Address" />
            {onDesktop ? (
              <div className={styles["form__section-inputs-wrap"]}>
                <Input type="text" title="State" />
                <Input type="text" title="ZIP code" />
              </div>
            ) : (
              <>
                <Input type="text" title="State" />
                <Input type="text" title="ZIP code" />
              </>
            )}
          </section>
        )}

        <section
          className={cn(
            styles["form__payment-method"],
            styles["form__section"]
          )}
        >
          <h4
            className={cn(
              styles["form__payment-method-title"],
              styles["form__section-title"]
            )}
          >
            Payment method
          </h4>
          <RadioInput title="Credit card" />
          <RadioInput title="Cash" />
          {isPayingByCard && (
            <>
              <Input
                type="number"
                title="Card number"
                autocomplete="cc-number"
              />
              <div className={styles["form__section-inputs-wrap"]}>
                <Input
                  type="text"
                  title="Expiration date"
                  autocomplete="cc-exp"
                />
                <Input type="number" title="CVV" autocomplete="cc-csc" />
              </div>
            </>
          )}
        </section>
        <button
          type="submit"
          className={styles["form__place-order"]}
          disabled={isSubmitDisabled}
        >
          Place order
        </button>
      </form>

      <section className={styles["order-summary"]}>
        {onTablet ? (
          <ProductsTable />
        ) : (
          <>
            <h3 className={styles["order-summary__title"]}>Order summary</h3>
            <div className={styles["order-summary__products"]}>
              {Object.values(cartProducts).map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  usedFor="checkoutDetails"
                />
              ))}
            </div>
          </>
        )}
        <div className={styles["order-summary__prices"]}>
          <div
            className={cn(
              styles["order-summary__shipping"],
              styles["order-summary__prices-subsection"]
            )}
          >
            <p className={styles["order-summary__shipping-title"]}>
              {isPickUpChosen ? "Pick Up" : "Shipping"}
            </p>
            <p className={styles["order-summary__shipping-price"]}>
              {!shippingPrice ? "Free" : normalizePrice(shippingPrice)}
            </p>
          </div>
          <div
            className={cn(
              styles["order-summary__subtotal"],
              styles["order-summary__prices-subsection"]
            )}
          >
            <p className={styles["order-summary__subtotal-title"]}>Subtotal</p>
            <p className={styles["order-summary__subtotal-price"]}>
              {normalizePrice(subtotal)}
            </p>
          </div>
          <div
            className={cn(
              styles["order-summary__total"],
              styles["order-summary__prices-subsection"]
            )}
          >
            <p className={styles["order-summary__total-title"]}>Total</p>
            <p className={styles["order-summary__total-price"]}>
              {normalizePrice(total)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
