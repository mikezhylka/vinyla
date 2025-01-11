import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { SetStateAction, useEffect, useState } from "react";
import { useAppContext } from "../../../../../../context/useAppContext";
import { ProductsTable } from "../../../../../blocks/ProductsTable/ProductsTable";
import { normalizePrice } from "../../../handlers";
import { CartProduct } from "../../CartProduct/CartProduct";
import { Input } from "../../Input";
import { RadioInput } from "../../RadioInput/RadioInput";
import { FormInitValues, FormValuesType } from "./config";
import styles from "./index.module.scss";

type Props = {
  isPickUpChosen: boolean;
  shippingPrice: number;
  total: number;
  subtotal: number;
  isPayingByCard: boolean;
  setIsPayingByCard: React.Dispatch<SetStateAction<boolean>>;
};

export const StepTwoSection: React.FC<Props> = ({
  isPickUpChosen,
  shippingPrice,
  total,
  subtotal,
  isPayingByCard,
  setIsPayingByCard,
}) => {
  const {
    cartProducts,
    setActiveCartStep,
    setCartProducts,
    setCartQuantities,
    setPurchasedProducts,
  } = useAppContext();

  const [formState, setFormState] = useState<FormValuesType>(FormInitValues);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const windowSize = useWindowSize();
  const width = windowSize.width;
  const onDesktop = width && width > 1440;
  const onTablet = width && width >= 640 && width < 1440;

  useEffect(() => {
    const formStateArray = Object.values(formState);

    const isDisabled: boolean =
      formStateArray.filter(
        (input) => !input.error.length && input.value.length > 3
      ) === formStateArray;

    console.log(isDisabled);

    setIsSubmitDisabled(!isDisabled);
  }, [formState]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPurchasedProducts(cartProducts);
    setCartProducts({});
    setCartQuantities({});
    setActiveCartStep((prev) => prev + 1);
  }

  return (
    <div className={styles["step-two-wrap"]}>
      <form
        action="POST"
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
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
          {onDesktop ? ( // wrap inputs to have two of them in one line, otherwise not
            <div className={styles["form__section-inputs-wrap"]}>
              <Input
                type="text"
                title="First name"
                formState={formState}
                setFormState={setFormState}
              />
              <Input
                type="text"
                title="Last name"
                formState={formState}
                setFormState={setFormState}
              />
            </div>
          ) : (
            <>
              <Input
                type="text"
                title="First name"
                formState={formState}
                setFormState={setFormState}
              />
              <Input
                type="text"
                title="Last name"
                formState={formState}
                setFormState={setFormState}
              />
            </>
          )}
          <Input
            type="tel"
            title="Phone number"
            formState={formState}
            setFormState={setFormState}
          />
          <Input
            type="email"
            title="Email"
            formState={formState}
            setFormState={setFormState}
          />
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
            <Input
              type="text"
              title="Country"
              formState={formState}
              setFormState={setFormState}
            />
            <Input
              type="text"
              title="Town/City"
              formState={formState}
              setFormState={setFormState}
            />
            <Input
              type="text"
              title="Street Address"
              formState={formState}
              setFormState={setFormState}
            />
            {onDesktop ? (
              <div className={styles["form__section-inputs-wrap"]}>
                <Input
                  type="text"
                  title="State"
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  type="text"
                  title="ZIP code"
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>
            ) : (
              <>
                <Input
                  type="text"
                  title="State"
                  formState={formState}
                  setFormState={setFormState}
                />
                <Input
                  type="text"
                  title="ZIP code"
                  formState={formState}
                  setFormState={setFormState}
                />
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
          <RadioInput
            title="Credit card"
            setIsPayingByCard={setIsPayingByCard}
            setFormState={setFormState}
          />
          <RadioInput
            title="Cash"
            setIsPayingByCard={setIsPayingByCard}
            setFormState={setFormState}
          />
          {isPayingByCard && (
            <>
              <Input
                type="number"
                title="Card number"
                autocomplete={"cc-number"}
                // formState={formState}
                // setFormState={setFormState}
              />
              <div className={styles["form__section-inputs-wrap"]}>
                <Input
                  type="text"
                  title="Expiration date"
                  autocomplete="cc-exp"
                  // formState={formState}
                  // setFormState={setFormState}
                />
                <Input
                  type="number"
                  title="CVV"
                  autocomplete="cc-csc"
                  // formState={formState}
                  // setFormState={setFormState}
                />
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
