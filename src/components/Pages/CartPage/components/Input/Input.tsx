// import styles from './index.module.scss';
import cn from "classnames";
import { SetStateAction, useEffect, useState } from "react";
import { FormValuesType } from "../Steps/StepTwoSection/config";
// import { countries } from "./config";
import { handleBlur } from "./handlers";
import styles from "./index.module.scss";

type Props = {
  type: string;
  title: string;
  autocomplete?: string;
  formState?: FormValuesType;
  setFormState?: React.Dispatch<SetStateAction<FormValuesType>>;
};

export const Input: React.FC<Props> = ({
  type,
  title,
  // autocomplete,
  formState,
  setFormState,
}) => {
  function handleSettingError(error: string) {
    return (
      setFormState &&
      setFormState((prev) => ({
        ...prev,
        [title]: {
          value,
          error,
        },
      }))
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return (
      setFormState &&
      setFormState((prev) => ({
        ...prev,
        [title]: {
          value: e.target.value,
          error: "",
        },
      }))
    );
  }

  const value: string = formState
    ? formState[title as keyof FormValuesType]?.value
    : "";

  const err =
    formState &&
    Object.entries(formState).find(
      (element) => element[0] === title && element[1].error
    );

  const [error, setError] = useState("");

  useEffect(() => {
    if (err) {
      setError(err[1].error);
    } else {
      setError("");
    }
  }, [err]);

  const errMsg = err && err[1].error;

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
        onBlur={(e) => handleBlur(e, title, type, handleSettingError)}
        onChange={handleChange}
        required={title !== "State"}
        // autoComplete={autocomplete}
      />
      {errMsg && <p className={styles["input-wrap__error"]}>{errMsg}</p>}
    </div>
  );
};
