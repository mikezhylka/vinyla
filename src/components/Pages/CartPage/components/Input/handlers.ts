import { countries } from "./config";

export function handleBlur(
  e: React.ChangeEvent<HTMLInputElement>,
  title: string,
  type: string,
  handleSettingError: (error: string) => void
) {
  const { value } = e.target;
  const validNameExp: RegExp = /^[a-zA-Z]{2,50}(?: [a-zA-Z]{2,50})*$/;
  const validLastNameExp: RegExp = /^[a-zA-Z]{2,50}$/;
  const validPhoneNumberExp: RegExp = /[0-9\s()+-]/;
  const validStreetAddressExp: RegExp = /^[a-zA-Z0-9\s.-]{5,100}$/;
  const validCardNumberExp: RegExp = /^(?:\d{4} ?){4}$/;
  const validCvvExp: RegExp = /^\d{3,4}$/;
  const validExpirationDateExp: RegExp = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const validEmailExp: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (value.length < 3) {
    handleSettingError(`${title} must have at least 3 characters.`);
  }

  if (title === "First name" && !validNameExp.test(value)) {
    handleSettingError("Name must include only letters.");
  }

  if (title === "Last name" && !validLastNameExp.test(value)) {
    handleSettingError("Last name must include only letters.");
  }

  if (type === "tel" && !validPhoneNumberExp.test(value)) {
    handleSettingError("Please, type correct phone number.");
  }

  if (type === "email" && !validEmailExp.test(value)) {
    handleSettingError("Please, type correct email.");
  }

  if (title === "Country" && !countries.includes(value.toLowerCase())) {
    handleSettingError("Please, type correct country.");
  }

  if (title === "Street Address" && !validStreetAddressExp.test(value)) {
    handleSettingError("Please, type correct street number.");
  }

  if (title === "Card number" && !validCardNumberExp.test(value)) {
    handleSettingError("Please, type correct card number.");
  }

  if (title === "CVV" && !validCvvExp.test(value)) {
    handleSettingError("Please, type correct CVV.");
  }

  if (title === "Expiration date" && !validExpirationDateExp.test(value)) {
    handleSettingError("Please, type correct Expiration date.");
  }
}
