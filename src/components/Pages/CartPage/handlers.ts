import cn from "classnames";
import styles from "./index.module.scss";

export function addTableTitleClassName(modifier: string): string {
  const defaultClassName = "cart-form__table-title";

  return cn(
    styles[defaultClassName],
    styles[`${defaultClassName}--${modifier}`]
  );
}

export function normalizePrice(price: number): string {
  return `${price.toFixed(2)}$`
}