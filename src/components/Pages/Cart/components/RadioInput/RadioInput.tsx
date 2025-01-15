import { useCartContext } from "../../../../../contexts/Cart/useCartContext";
import { normalizePrice } from "../../handlers";
import styles from "./index.module.scss";

type Props = {
  title: string;
  pricing?: string;
};

export const RadioInput: React.FC<Props> = ({ title, pricing }) => {
  const { setShippingPrice, setIsPayingByCard, setIsPickUpChosen } =
    useCartContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setShippingPrice(parseInt(value));
    setIsPayingByCard(value === "Credit card");
    setIsPickUpChosen(value === "-10");
  }

  return (
    <div className={styles["input-wrap"]}>
      <input
        type="radio"
        name="delivery"
        className={styles["input"]}
        id={`radio-${title}`}
        defaultChecked={title === "Free shipping" || title === "Credit card"}
        value={pricing || title}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <label htmlFor={`radio-${title}`} className={styles["input-wrap-2"]}>
        <div className={styles["input__custom"]}></div>
        <p className={styles["input__title"]}>{title}</p>
      </label>
      {pricing && (
        <p className={styles["input__price"]}>
          {normalizePrice(parseInt(pricing))}
        </p>
      )}
    </div>
  );
};
