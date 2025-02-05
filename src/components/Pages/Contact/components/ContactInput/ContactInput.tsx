import { FC, useEffect, useState } from "react";
import { countries, validations } from "../../../../../constants/input";
import { useContactContext } from "../../../../../contexts/Contact/useContactContext";
import { ContactFormState } from "../../../../../types/ContactFormState";
import { BaseInput } from "../../../../blocks/BaseInput";

type Props = {
  title: string;
  type: string;
  autocomplete?: string;
};

export const ContactInput: FC<Props> = ({ title, type, autocomplete }) => {
  const { contactFormState, setContactFormState } = useContactContext();
  const [errorMsg, setErrorMsg] = useState("");

  const stateInputError = Object.entries(contactFormState).find(
    ([key, value]) => key === title && value.error
  );

  useEffect(() => {
    if (stateInputError) {
      setErrorMsg(stateInputError[1].error);
    } else {
      setErrorMsg("");
    }
  }, [stateInputError]);

  const stateValue = contactFormState[title as keyof ContactFormState]?.value;

  function handleSettingError(error: string) {
    return setContactFormState((prev) => ({
      ...prev,
      [title]: {
        value: stateValue,
        error,
      },
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContactFormState((prev) => ({
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
      autocomplete={autocomplete}
      errorMsg={errorMsg}
      typedValue={stateValue}
      handleBlur={handleBlur}
      handleChange={handleChange}
    />
  );
};
