// import { usePageLeave } from "@uidotdev/usehooks";
import cn from "classnames";
import { SetStateAction, useEffect, useState } from "react";
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
  const {
    setPurchasedProducts,
    // activeCartStep,
    purchasedProducts,
    setActiveCartStep,
  } = useAppContext();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsInitialized(true);

    return () => {
      if (isInitialized) {
        setActiveCartStep(1);
        setPurchasedProducts({});
        setShippingPrice(0);
      }
    };
  }, [
    setActiveCartStep,
    setPurchasedProducts,
    setShippingPrice,
    isInitialized,
  ]);

  const purchasedProductsValues = Object.values(purchasedProducts);
  const purchasedProductsLength: number = purchasedProductsValues.length;
  const purchasedProductsSum: number = purchasedProductsValues.reduce(
    (acc, product) => {
      const { price, quantity } = product;

      return acc + price * quantity;
    },
    0
  );

  const total: number = purchasedProductsSum + shippingPrice;
  const paymentMethod: string = isPayingByCard ? "Credit card" : "Cash";

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
        {purchasedProductsValues.map((product, index) => (
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
        onClick={() => {
          navigate("/");
          setShippingPrice(0);
          setActiveCartStep(1);
          setPurchasedProducts({});
        }}
      >
        Go to home page
      </button>
    </section>
  );
};
