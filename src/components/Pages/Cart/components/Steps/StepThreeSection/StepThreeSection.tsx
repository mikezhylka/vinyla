import cn from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCartContext } from "../../../../../../contexts/Cart/useCartContext";
import { createOrderData } from "./config";
import styles from "./index.module.scss";
import { OrderData } from "./types";

export const StepThreeSection: React.FC = () => {
  const {
    setPurchasedProducts,
    purchasedProducts,
    setActiveCartStep,
    shippingPrice,
    setShippingPrice,
    isPayingByCard,
  } = useCartContext();
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
  const purchasedProductsLength = purchasedProductsValues.length;
  const purchasedProductsSum = purchasedProductsValues.reduce(
    (acc, product) => {
      const { price, quantity } = product;

      return acc + price * quantity;
    },
    0
  );

  const total = purchasedProductsSum + shippingPrice;
  const paymentMethod = isPayingByCard ? "Credit card" : "Cash";

  const orderData: OrderData[] = createOrderData(total, paymentMethod);

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
        onClick={() => navigate("/")}
      >
        Go to home page
      </button>
    </section>
  );
};
