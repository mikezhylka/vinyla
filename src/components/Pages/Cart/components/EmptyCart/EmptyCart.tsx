import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.scss";

export const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => window.scrollTo({top: 0, behavior: "instant"}), []);

  return (
    <div className={styles["cart-empty"]}>
      <p className={styles["cart-empty__title"]}>
        Oops, seems your cart is empty
      </p>
      <button
        className={styles["cart-empty__go-shopping"]}
        onClick={() => navigate("/shop")}
      >
        Go to shop
      </button>
    </div>
  );
};
