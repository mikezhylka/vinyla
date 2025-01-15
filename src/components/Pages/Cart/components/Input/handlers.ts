// import { countries } from "./config";

// export function handleBlur(
//   e: React.ChangeEvent<HTMLInputElement>,
//   title: string,
//   type: string,
//   handleSettingError: (error: string) => void
// ) {
//   const { value } = e.target;

//   // prettier-ignore
//   const validations: { [key: string]: { regex: RegExp } } = {
//     "First name": { regex: /^[a-zA-Z]{2,50}(?: [a-zA-Z]{2,50})*$/ },
//     "Last name": { regex: /^[a-zA-Z]{2,50}$/ },
//     "Street Address": { regex: /^[a-zA-Z0-9\s.-]{5,100}$/ },
//     "tel": { regex: /[0-9\s()+-]/ },
//     "email": { regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
//     "Card number": { regex: /^(?:\d{4} ?){4}$/ },
//     "CVV": { regex: /^\d{3,4}$/ },
//     "Expiration date": { regex: /^(0[1-9]|1[0-2])\/\d{2}$/ },
//   };

//   if (!value.length) {
//     handleSettingError(`${title} must not be empty`);
//     return;
//   }

//   if (validations[title] && !validations[title].regex.test(value)) {
//     handleSettingError(`Please, type correct ${title}`);
//     return;
//   }

//   if (validations[type] && !validations[type].regex.test(value)) {
//     handleSettingError(`Please, type correct ${type}`);
//     return;
//   }

//   if (title === "Country" && !countries.includes(value.toLowerCase())) {
//     handleSettingError(`Please, type correct country.`);
//   }
// }
