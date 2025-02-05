import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useCallback, useEffect, useState } from "react";
import { tabletWidth } from "../../../../../../constants/breakpoints";
import {
  addressTitles,
  cardTitles,
  CONFIRMATION_FORM_ADDRESS_INPUTS_LENGTH,
  CONFIRMATION_FORM_CARD_INPUTS_LENGTH,
  confirmationFormInitValues,
  STANDARD_CONFIRMATION_FORM_LENGTH,
} from "../../../../../../constants/forms";
import { useAppContext } from "../../../../../../contexts/App/useAppContext";
import { useCartContext } from "../../../../../../contexts/Cart/useCartContext";
import { useScroll } from "../../../../../../hooks/useScroll";
import { ProductsTable } from "../../../../../blocks/ProductsTable/ProductsTable";
import { normalizePrice } from "../../../handlers";
import { CartInput } from "../../CartInput/CartInput";
import { CartProduct } from "../../CartProduct/CartProduct";
import { RadioInput } from "../../RadioInput/RadioInput";
import styles from "./index.module.scss";

type Props = {
  total: number;
};

export const StepTwoSection: React.FC<Props> = ({ total }) => {
  const { isOnDesktop } = useAppContext();
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

  const { width } = useWindowSize();
  const onTablet = width && width >= tabletWidth && !isOnDesktop;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useScroll({ options: { top: 0, behavior: "instant" } });

  const areAllInputsValid = useCallback(() => {
    let filteredState = Object.entries(confirmationFormState).filter(
      (input) => {
        const { value, error } = input[1];

        return value.length > 0 && !error.length;
      }
    );

    if (!isPayingByCard && isPickUpChosen) {
      filteredState = filteredState.filter(
        (input) =>
          !cardTitles.includes(input[0]) && !addressTitles.includes(input[0])
      );

      return (
        filteredState.length ===
        STANDARD_CONFIRMATION_FORM_LENGTH -
          CONFIRMATION_FORM_ADDRESS_INPUTS_LENGTH -
          CONFIRMATION_FORM_CARD_INPUTS_LENGTH
      );
    }

    if (isPickUpChosen) {
      filteredState = filteredState.filter(
        (input) => !addressTitles.includes(input[0])
      );

      return (
        filteredState.length ===
        STANDARD_CONFIRMATION_FORM_LENGTH -
          CONFIRMATION_FORM_ADDRESS_INPUTS_LENGTH
      );
    }
    if (!isPayingByCard) {
      filteredState = filteredState.filter(
        (input) => !cardTitles.includes(input[0])
      );

      return (
        filteredState.length ===
        STANDARD_CONFIRMATION_FORM_LENGTH - CONFIRMATION_FORM_CARD_INPUTS_LENGTH
      );
    } else {
      return filteredState.length === STANDARD_CONFIRMATION_FORM_LENGTH;
    }
  }, [confirmationFormState, isPickUpChosen, isPayingByCard]);

  useEffect(() => {
    setIsSubmitDisabled(!areAllInputsValid());
  }, [
    isPickUpChosen,
    setIsSubmitDisabled,
    confirmationFormState,
    areAllInputsValid,
  ]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPurchasedProducts(cartProducts);
    setCartProducts({});
    setCartQuantities({});
    setIsFormSubmited(true);
    setActiveCartStep(3);
    setConfirmationFormState({ ...confirmationFormInitValues });
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
          {isOnDesktop ? ( // wrap inputs to have two of them in one line
            <div className={styles["form__section-inputs-wrap"]}>
              <CartInput type="text" title="First name" />
              <CartInput type="text" title="Last name" />
            </div>
          ) : (
            <>
              <CartInput type="text" title="First name" />
              <CartInput type="text" title="Last name" />
            </>
          )}
          <CartInput type="tel" title="Phone number" />
          <CartInput type="email" title="Email" />
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
            <CartInput type="text" title="Country" />
            <CartInput type="text" title="Town/City" />
            <CartInput type="text" title="Street Address" />
            {isOnDesktop ? (
              <div className={styles["form__section-inputs-wrap"]}>
                <CartInput type="text" title="State" />
                <CartInput type="text" title="ZIP code" />
              </div>
            ) : (
              <>
                <CartInput type="text" title="State" />
                <CartInput type="text" title="ZIP code" />
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
              <CartInput
                type="number"
                title="Card number"
                autocomplete="cc-number"
              />
              <div className={styles["form__section-inputs-wrap"]}>
                <CartInput
                  type="text"
                  title="Expiration date"
                  autocomplete="cc-exp"
                />
                <CartInput type="number" title="CVV" autocomplete="cc-csc" />
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
