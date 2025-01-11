import cn from "classnames";
import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../../../../../../context/useAppContext";
import styles from "./index.module.scss";
import { OrderData } from "./types";

type Props = {
  shippingPrice: number;
  setShippingPrice: React.Dispatch<SetStateAction<number>>;
  isPayingByCard: boolean;
};

export const StepThreeSection: React.FC<Props> = ({
  shippingPrice,
  setShippingPrice,
  isPayingByCard,
}) => {
  const { purchasedProducts, setActiveCartStep } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      setShippingPrice(0);
      // setActiveCartStep(1);
      // setPurchasedProducts({});
    };
  }, [setActiveCartStep, setShippingPrice]);

  const purchasedProductsSum: number = Object.values(purchasedProducts).reduce(
    (acc, product) => {
      const { price, quantity } = product;

      return acc + price * quantity;
    },
    0
  );

  const total: number = purchasedProductsSum + shippingPrice;
  const paymentMethod: string = isPayingByCard ? "Credit card" : "Cash";
  const purchasedProductsLength: number =
    Object.values(purchasedProducts).length;

  function countCurrentTime(): string {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function countRandomOrderNumber(): number {
    return Math.floor(Math.random() * 100000000);
  }

  const orderData: OrderData[] = [
    {
      title: "Order code:",
      value: countRandomOrderNumber(), // just to show-case
    },
    {
      title: "Date:",
      value: countCurrentTime(),
    },
    {
      title: "Total:",
      value: `$${total}`,
    },
    {
      title: "Payment method:",
      value: paymentMethod,
    },
  ];

  return (
    <section className={styles["confirmation"]}>
      <h3 className={styles["confirmation__thank"]}>Thank you!</h3>
      <h1 className={styles["confirmation__title"]}>
        Your order has been received
      </h1>
      <div className={styles["confirmation__products"]}>
        {Object.values(purchasedProducts).map((product, index) => (
          <div
            className={cn(
              styles["confirmation__products-product"],
              styles["product"],
              {
                [styles["product--is-single"]]: purchasedProductsLength === 1,
                [styles["product--is-odd"]]:
                  (index + 1) % 2 !== 0 && purchasedProductsLength !== 1,
              }
            )}
            key={product.id}
          >
            <img
              className={styles["product__photo"]}
              src={product.photo}
              alt="product image"
            />
            <p className={cn(styles["product__quantity"])}>
              {product.quantity}
            </p>
          </div>
        ))}
      </div>
      <section className={styles["confirmation__order-details"]}>
        {orderData.map((detail) => {
          const { title, value } = detail;

          return (
            <div
              className={styles["confirmation__order-details-detail"]}
              key={title}
            >
              <p className={styles["confirmation__order-details-detail-title"]}>
                {title}
              </p>
              <h4 className={styles["confirmation__order-details-detail-info"]}>
                {value}
              </h4>
            </div>
          );
        })}
      </section>
      <button
        className={styles["confirmation__go-home"]}
        onClick={() => navigate("/")}
      >
        Go to home page
      </button>
    </section>
  );
};
