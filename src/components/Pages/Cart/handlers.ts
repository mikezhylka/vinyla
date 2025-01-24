import cn from "classnames";
import { CartStep } from "../../../types/CartStep";
import styles from "./index.module.scss";

export function addTableTitleClassName(modifier: string): string {
  const defaultClassName = "cart-form__table-title";

  return cn(
    styles[defaultClassName],
    styles[`${defaultClassName}--${modifier}`]
  );
}

export function normalizePrice(price: number): string {
  return `${price.toFixed(2)}$`;
}

export function calculateVisibleCartSteps(
  width: number | null,
  cartSteps: CartStep[],
  activeCartStep: number
) {
  return width && width < 640 ? cartSteps.slice(activeCartStep - 1) : cartSteps;
}
