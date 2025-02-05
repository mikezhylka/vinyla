export const confirmationFormInitValues = {
  "First name": { value: "", error: "" },
  "Last name": { value: "", error: "" },
  "Phone number": { value: "", error: "" },
  Email: { value: "", error: "" },
  Country: { value: "", error: "" },
  "Town/City": { value: "", error: "" },
  "Street Address": { value: "", error: "" },
  State: { value: "", error: "" },
  "ZIP code": { value: "", error: "" },
  "Card number": { value: "", error: "" },
  "Expiration date": { value: "", error: "" },
  CVV: { value: "", error: "" },
};

export const contactFormInitVals = {
  "First name": { value: "", error: "" },
  "Last name": { value: "", error: "" },
  Email: { value: "", error: "" },
  Subject: { value: "", error: "" },
  Message: { value: "", error: "" },
};

export const addressTitles: string[] = [
  "Country",
  "Town/City",
  "Street Address",
  "State",
  "ZIP code",
];

export const cardTitles: string[] = ["Card number", "Expiration date", "CVV"];

export const STANDARD_CONFIRMATION_FORM_LENGTH = 12;
export const CONFIRMATION_FORM_ADDRESS_INPUTS_LENGTH = 5;
export const CONFIRMATION_FORM_CARD_INPUTS_LENGTH = 3;