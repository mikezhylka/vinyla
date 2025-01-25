import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useEffect, useState } from "react";
import { desktopWidth } from "../../../../../../../../constants/breakpoints";
import styles from "./index.module.scss";

export const CouponSection: React.FC = () => {
  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width) {
      setIsOnDesktop(width >= desktopWidth);
    }
  }, [width]);

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
