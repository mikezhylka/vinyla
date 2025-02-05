import cn from "classnames";
import { FC } from "react";
import styles from "./BaseInput.module.scss";

type Props = {
  type: string;
  title: string;
  autocomplete?: string;
  errorMsg: string;
  typedValue: string;
  handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BaseInput: FC<Props> = ({
  type,
  title,
  autocomplete,
  errorMsg,
  typedValue,
  handleBlur,
  handleChange,
}) => {
  return (
    <div className={styles["input-wrap"]}>
      <label className={styles["input-title"]} htmlFor={title}>
        {title}
      </label>
      <input
        className={cn(styles["input"], { [styles["input--error"]]: errorMsg })}
        type={type}
        id={title}
        placeholder={title}
        value={typedValue}
        onBlur={handleBlur}
        onChange={handleChange}
        required
        autoComplete={autocomplete}
      />
      {errorMsg && <p className={styles["input-wrap__error"]}>{errorMsg}</p>}
    </div>
  );
};
