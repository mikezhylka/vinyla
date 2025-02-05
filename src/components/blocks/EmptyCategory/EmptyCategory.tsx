import { FC } from "react";
import { useNavigate } from "react-router";
import { useScroll } from "../../../hooks/useScroll";
import styles from "./EmptyCategory.module.scss";

type Props = {
  page: "favorites" | "cart";
};

export const EmptyCategory: FC<Props> = ({ page }) => {
  const navigate = useNavigate();

  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <div className={styles["empty-category"]}>
      <p className={styles["empty-category__title"]}>
        Oops, seems your {page} is empty
      </p>
      <button
        className={styles["empty-category__btn"]}
        onClick={() => navigate("/shop")}
      >
        Go to shop
      </button>
    </div>
  );
};
