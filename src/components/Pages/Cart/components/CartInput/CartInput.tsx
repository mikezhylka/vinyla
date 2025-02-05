import { FC, useEffect, useState } from "react";
import { countries, validations } from "../../../../../constants/input";
import { useCartContext } from "../../../../../contexts/Cart/useCartContext";
import { ConfirmationFormState } from "../../../../../types/ConfirmationFormState";
import { BaseInput } from "../../../../blocks/BaseInput";

type Props = {
  type: string;
  title: string;
  autocomplete?: string;
};

export const CartInput: FC<Props> = ({ type, title, autocomplete }) => {
  const { confirmationFormState, setConfirmationFormState } = useCartContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [wasSlashAdded, setWasSlashAdded] = useState(false);

  const stateInputError = Object.entries(confirmationFormState).find(
    ([key, value]) => key === title && value.error
  );

  useEffect(() => {
    if (stateInputError) {
      setErrorMsg(stateInputError[1].error);
    } else {
      setErrorMsg("");
    }
  }, [stateInputError]);

  const stateValue =
    confirmationFormState[title as keyof ConfirmationFormState]?.value;

  function handleSettingError(error: string) {
    return setConfirmationFormState((prev) => ({
      ...prev,
      [title]: {
        value: stateValue,
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
    <BaseInput
      type={type}
      title={title}
      typedValue={stateValue}
      autocomplete={autocomplete}
      errorMsg={errorMsg}
      handleBlur={handleBlur}
      handleChange={handleChange}
    />
  );
};
