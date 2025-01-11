// import cn from "classnames";
import { SetStateAction } from "react";
import { normalizePrice } from "../../handlers";
import { FormValuesType } from "../Steps/StepTwoSection/config";
import styles from "./index.module.scss";

type Props = {
  title: string;
  pricing?: string;
  setShippingPrice?: React.Dispatch<SetStateAction<number>>;
  setIsPayingByCard?: React.Dispatch<SetStateAction<boolean>>;
  setIsPickUpChosen?: React.Dispatch<SetStateAction<boolean>>;
  setFormState?: React.Dispatch<SetStateAction<FormValuesType>>;
};

export const RadioInput: React.FC<Props> = ({
  title,
  pricing,
  setShippingPrice,
  setIsPayingByCard,
  setIsPickUpChosen,
  setFormState,

}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;


    if (setShippingPrice) {
      setShippingPrice(parseInt(value));
    }

    if (setIsPayingByCard) {
      setIsPayingByCard(value === 'Credit card');
    }

    if (setIsPickUpChosen) {
      setIsPickUpChosen(value === '-10')
    }

    if (setFormState) {
      setFormState(prev => ({ ...prev, [title]: e.target.value }))
    }
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
