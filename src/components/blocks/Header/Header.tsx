import cn from "classnames";
import { NavLink, useLocation } from "react-router";
import { useCartContext } from "../../../contexts/Cart/useCartContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { topBarLinks } from "./config";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { setIsMenuShown } = useProductContext();
  const { isProductPageOpened } = useProductContext();
  const { cartProducts } = useCartContext();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header
      className={cn(styles["header"], {
        [styles["header--home-page"]]: isHomePage,
      })}
    >
      <div
        className={cn(styles["header__top-bar"], {
          [styles["header__top-bar--product-page"]]: isProductPageOpened,
        })}
      >
        <NavLink
          className={styles["header__brand-link"]}
          to={"/"}
          onClick={scrollToTop}
        />
        <div className={styles["header__menu-cart-wrap"]}>
          <div
            className={cn(
              styles["header__menu"],
              styles["header__menu-toggle"]
            )}
          >
            {pathname === "/menu" ? (
              <NavLink
                className={cn(
                  styles["header__menu-link"],
                  styles["header__menu-link--exit"]
                )}
                to="/"
                onClick={() => setIsMenuShown(false)}
              />
            ) : (
              <NavLink
                className={cn(
                  styles["header__menu-link"],
                  styles["header__menu-link--entry"]
                )}
                to="/menu"
                onClick={() => setIsMenuShown(true)}
              />
            )}
          </div>
          <nav className={styles["header__navigation"]}>
            <ul className={styles["header__list"]}>
              {topBarLinks.map((item) => (
                <li className={styles["header__list-item"]} key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => {
                      return cn(styles["header__link"], {
                        [styles["header__link--active"]]: isActive,
                      });
                    }}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <NavLink
            to={"/favorites"}
            className={({ isActive }) => {
              return isActive
                ? styles["header__favorites-link--active"]
                : styles["header__favorites-link"];
            }}
          />
          <div className={styles["header__cart"]}>
            <NavLink className={styles["header__cart-link"]} to={"/cart"} />
            <p className={styles["header__cart-quantity"]}>
              {Object.entries(cartProducts)?.length}
            </p>
          </div>
        </div>
      </div>
      {isHomePage && (
        <div className={styles["header__hero"]}>
          <p className={styles["header__hero-subtitle"]}>Vinyla Corner</p>
          <h1 className={styles["header__hero-title"]}>
            Vinyla Corner: Where Music Spins <br />
            It's{" "}
            <span className={styles["header__hero-title-bold"]}>
              Best Stories!
            </span>
          </h1>
          <p className={styles["header__hero-tagline"]}>
            Dive into timeless melodies at our vinyl shop, where classic tunes
            await
          </p>
          <button className={styles["header__hero-button"]}>
            <NavLink to="/shop" className={styles["header__hero-button__link"]}>
              Buy
            </NavLink>
          </button>
        </div>
      )}
    </header>
  );
};
