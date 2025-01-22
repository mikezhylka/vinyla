import cn from "classnames";
import { useEffect, useState } from "react";
import { useCartContext } from "../../../../../contexts/Cart/useCartContext";
import { FormValuesType } from "../Steps/StepTwoSection/config";
import { countries } from "./config";
import styles from "./index.module.scss";

type Props = {
  type: string;
  title: string;
  autocomplete?: string;
};

export const Input: React.FC<Props> = ({ type, title, autocomplete }) => {
  const { confirmationFormState, setConfirmationFormState } = useCartContext();
  const [error, setError] = useState("");
  const [wasSlashAdded, setWasSlashAdded] = useState(false);

  const err = Object.entries(confirmationFormState).find(
    (element) => element[0] === title && element[1].error
  );

  useEffect(() => {
    if (err) {
      setError(err[1].error);
    } else {
      setError("");
    }
  }, [err]);

  const errMsg = err && err[1].error;

  const value: string =
    confirmationFormState[title as keyof FormValuesType]?.value;

  function handleSettingError(error: string) {
    return setConfirmationFormState((prev) => ({
      ...prev,
      [title]: {
        value,
        error,
      },
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toString().trim();
    const isTwoCharactersLong = inputValue.length === 2;
    const isExpirationDateField = title === "Expiration date";
  
    if (isTwoCharactersLong && isExpirationDateField && !wasSlashAdded) {
      e.target.value += "/";
      setWasSlashAdded(true);
    } else {
      setWasSlashAdded(false);
    }

    return setConfirmationFormState((prev) => ({
      ...prev,
      [title]: {
        value: e.target.value,
        error: "",
      },
    }));
  }

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    // prettier-ignore
    const validations: { [key: string]: { regex: RegExp } } = {
      "First name": { regex: /^[a-zA-Z]{2,50}(?: [a-zA-Z]{2,50})*$/ },
      "Last name": { regex: /^[a-zA-Z]{2,50}$/ },
      "Street Address": { regex: /^[a-zA-Z0-9\s.-]{5,100}$/ },
      "tel": { regex: /[0-9\s()+-]/ },
      "email": { regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
      "Card number": { regex: /^(?:\d{4} ?){4}$/ },
      "CVV": { regex: /^\d{3,4}$/ },
      "Expiration date": { regex: /^(0[1-9]|1[0-2])\/\d{2}$/ },
    };

    if (!value.length) {
      handleSettingError(`${title} should not be empty`);
      return;
    }

    if (validations[title] && !validations[title].regex.test(value)) {
      handleSettingError(`Please, type correct ${title.toLowerCase()}`);
      return;
    }

    if (validations[type] && !validations[type].regex.test(value)) {
      handleSettingError(`Please, type correct ${title.toLowerCase()}`);
      return;
    }

    if (title === "Country" && !countries.includes(value.toLowerCase())) {
      handleSettingError(`Please, type correct country.`);
    }
  }

  return (
    <div className={styles["input-wrap"]}>
      <label className={styles["input-title"]} htmlFor={title}>
        {title}
      </label>
      <input
        className={cn(styles["input"], { [styles["input--error"]]: error })}
        type={type}
        id={title}
        placeholder={title}
        value={value}
        onBlur={(e) => handleBlur(e)}
        onChange={handleChange}
        required
        autoComplete={autocomplete}
      />
      {errMsg && <p className={styles["input-wrap__error"]}>{errMsg}</p>}
    </div>
  );
};
