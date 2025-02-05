import { Link } from "react-router";
import { directContacts } from "../../../../../constants/contacts";
import styles from "./index.module.scss";

export const ContactsDefinitionList: React.FC = () => {
  return (
    <dl className={styles["contacts__definition-list"]}>
      {directContacts.map((contact) => {
        const { title, link, href } = contact;

        return (
          <div
            key={title}
            className={styles["contacts__definition-list-item-wrap"]}
          >
            <dt className={styles["contacts__definition-list-term"]}>
              {title}
            </dt>
            <dd className={styles["contacts__definition-list-description"]}>
              <Link
                className={styles["contacts__definition-list-description-link"]}
                to={href}
                onClick={(e) => e.preventDefault()}
              >
                {link}
              </Link>
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
