import cn from "classnames";
import styles from "./Footer.module.scss";

export function addFooterItemClassName(link: string) {
  return cn(
    styles["footer__item"],
    link !== "Privacy Policy"
      ? styles["footer__item--sm"]
      : styles["footer__item--policy"]
  );
}
