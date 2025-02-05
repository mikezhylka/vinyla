import cn from "classnames";
import { Link } from "react-router";
import { directContacts, footerLinks } from "../../../constants/contacts";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import styles from "./Footer.module.scss";
import { addFooterItemClassName } from "./handlers";

export const Footer: React.FC = () => {
  const { error } = useAppContext();
  const { isMenuShown } = useProductContext();

  if (error || isMenuShown) {
    return null;
  }

  return (
    <footer className={styles["footer"]}>
      <nav className={styles["footer__navigation"]}>
        <ul className={styles["footer__contacts-list"]}>
          <div className={styles["footer__contacts-list__direct-contacts"]}>
            {directContacts.map((contact) => {
              const { title, link, href } = contact;

              return (
                <div key={link} className={styles["contact__wrap"]}>
                  <li
                    className={cn(
                      styles["footer__item"],
                      styles[`footer__item--${href}`]
                    )}
                  >
                    {title}
                  </li>
                  <li className={styles["footer__item"]}>
                    <a
                      className={cn(
                        styles["footer__link"],
                        styles["footer__link--mail"]
                      )}
                      href={href}
                      onClick={(e) => e.preventDefault()}
                    >
                      {link}
                    </a>
                  </li>
                </div>
              );
            })}
          </div>

          <div className={styles["footer__contacts-list__sm"]}>
            {footerLinks.map((link) => (
              <li key={link} className={addFooterItemClassName(link)}>
                <a
                  className={styles["footer__link"]}
                  href={`#${link}`}
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </nav>

      <div className={styles["footer__media"]}>
        <Link
          className={styles["footer__media-logo-link"]}
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <p className={styles["footer__media-text"]}>
          designed by{" "}
          <span className={styles["footer__media-text--bold"]}>Lisa</span>
        </p>
      </div>
    </footer>
  );
};
