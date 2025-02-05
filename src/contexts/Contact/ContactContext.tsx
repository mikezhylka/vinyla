import React, { SetStateAction, useState } from "react";
import { contactFormInitVals } from "../../constants/forms";
import { ContactFormState } from "../../types/ContactFormState";
import { ContactContext } from "./createdContext";

export type ContactContextProps = {
  contactFormState: ContactFormState;
  setContactFormState: React.Dispatch<SetStateAction<ContactFormState>>;
};

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contactFormState, setContactFormState] = useState(contactFormInitVals);
  return (
    <ContactContext.Provider value={{ contactFormState, setContactFormState }}>
      {children}
    </ContactContext.Provider>
  );
}
