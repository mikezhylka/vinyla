import { useAppContext } from "../../../contexts/App/useAppContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { footerDirectContacts, footerLinks } from "./config";
import "./footer.scss";
import { addFooterItemClassName } from "./handlers";

export const Footer: React.FC = () => {
  const { error } = useAppContext();
  const { isMenuShown } = useProductContext();

  return (
    !error &&
    !isMenuShown && (
      <footer className="footer">
        <nav className="footer__navigation">
          <ul className="footer__contacts-list">
            <div className="footer__contacts-list__direct-contacts">
              {footerDirectContacts.map((contact) => {
                const { title, link, href } = contact;

                return (
                  <div key={link} className="contact__wrap">
                    <li
                      key={title}
                      className={`footer__item footer__item--${href}`}
                    >
                      {title}
                    </li>
                    <li className="footer__item">
                      <a
                        className="footer__link footer__link--mail"
                        href={href}
                      >
                        {link}
                      </a>
                    </li>
                  </div>
                );
              })}
            </div>

            <div className="footer__contacts-list__sm">
              {footerLinks.map((link) => (
                <li
                  key={link}
                  className={addFooterItemClassName(link)}
                >
                  <a className="footer__link" href={`#${link}`}>
                    {link}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </nav>

        <div className="footer__media">
          <a href="#logo" className="footer__media-logo-link"></a>
          <p className="footer__media-text">
            designed by <span className="footer__media-text--bold">Lisa</span>
          </p>
        </div>
      </footer>
    )
  );
};
