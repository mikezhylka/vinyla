import cn from "classnames";
import { useAppContext } from "../../../../../../../../contexts/App/useAppContext";
import styles from "./index.module.scss";

export const CouponSection: React.FC = () => {
  const { isOnDesktop } = useAppContext();

  return (
    <section
      className={cn(styles["have-a-coupon"], {
        [styles["have-a-coupon--desktop"]]: isOnDesktop,
      })}
    >
      <h5 className={styles["have-a-coupon__title"]}>Have a coupon?</h5>
      <p className={styles["have-a-coupon__description"]}>
        Add your code for an instant cart discount
      </p>
      <div className={styles["have-a-coupon__input-container"]}>
        <input
          className={styles["have-a-coupon__input"]}
          type="text"
          placeholder="Coupon code"
        />
        <button className={styles["have-a-coupon__apply"]}>Apply</button>
        <img
          src="./images/icons/mdi_coupon-outline.svg"
          alt="Coupon"
          className={styles["have-a-coupon__icon"]}
        />
      </div>
    </section>
  );
};
