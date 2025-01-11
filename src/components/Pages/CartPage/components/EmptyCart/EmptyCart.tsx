import { useNavigate } from "react-router";
import styles from "./index.module.scss";

export const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["cart-empty"]}>
      {/* <img
        className={styles["cart-empty__photo"]}
        src="/src/images/banners/cart-is-empty.webp"
        alt=""
      /> */}
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
