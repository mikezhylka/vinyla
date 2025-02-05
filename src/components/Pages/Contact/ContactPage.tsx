import { FC, FormEvent, useState } from "react";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useContactContext } from "../../../contexts/Contact/useContactContext";
import { useIsSubmitDisabled } from "../../../hooks/useIsSubmitDisabled";
import { useScroll } from "../../../hooks/useScroll";
import { Breadcrumbs } from "../../blocks/Breadcrumbs";
import { ContactInput } from "./components/ContactInput";
import { ContactsDefinitionList } from "./components/ContactsDefinitionList/ContactsDefinitionList";
import { FormSubmitted } from "./components/FormSubmitted/FormSubmitted";
import { SocialMediaList } from "./components/SocialMediaList/SocialMediaList";
import styles from "./index.module.scss";

export const ContactPage: FC = () => {
  const { isSubmitDisabled, isOnDesktop } = useAppContext();
  const { contactFormState } = useContactContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useScroll({ options: { top: 0, behavior: "instant" } });

  useIsSubmitDisabled(contactFormState);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFormSubmitted(true);
  }

  return isFormSubmitted ? (
    <FormSubmitted />
  ) : (
    <main className={styles.main}>
      <Breadcrumbs disabledPath="contact" />
      <div className={styles["main__sections-wrap"]}>
        <section className={styles.contacts}>
          <h2 className={styles["contacts__title"]}>
            We are always ready to help you and answer your quetions
          </h2>
          <p className={styles["contacts__description"]}>
            You can always reach out to us, and we will be happy to provide you
            with a response
          </p>
          <div className={styles["contacts__lists-wrap"]}>
            <ContactsDefinitionList />
            <SocialMediaList />
          </div>
        </section>
        <section className={styles["contact-us"]}>
          <h4 className={styles["contact-us__title"]}>Contact us</h4>
          <p className={styles["contact-us__description"]}>
            Write us your data and questions and get an answer
          </p>
          <form
            action="POST"
            className={styles["contact-us__form"]}
            onSubmit={handleSubmit}
            noValidate
          >
            {isOnDesktop ? (
              <div className={styles["contact-us__form-wrap"]}>
                <ContactInput type="text" title="First name" />
                <ContactInput type="text" title="Last name" />
              </div>
            ) : (
              <>
                <ContactInput type="text" title="First name" />
                <ContactInput type="text" title="Last name" />
              </>
            )}
            <ContactInput type="email" title="Email" />
            <ContactInput type="text" title="Subject" />
            <ContactInput type="text" title="Message" />
            <button
              type="submit"
              className={styles["contact-us__form-send"]}
              disabled={isSubmitDisabled}
            >
              Send message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
