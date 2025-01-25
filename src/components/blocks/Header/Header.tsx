import classNames from "classnames";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useCartContext } from "../../../contexts/Cart/useCartContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { topBarLinks } from "./config";
import "./header.scss";

export const Header: React.FC = () => {
  const { setIsMenuShown } = useProductContext();
  const { isProductPageOpened } = useProductContext();
  const { cartProducts } = useCartContext();
  const [showBanner, setShowBanner] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    return pathname === "/" ? setShowBanner(true) : setShowBanner(false);
  }, [pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header
      className="header"
      style={{ height: showBanner ? "100vh" : "auto" }}
    >
      <div
        className={classNames("header__top-bar", {
          "header__top-bar--product-page": isProductPageOpened,
        })}
      >
        <NavLink
          className="header__brand-link"
          to={"/"}
          onClick={scrollToTop}
        />
        <div className="header__menu-cart-wrap">
          <div className="header__menu header__menu-toggle">
            {pathname === "/menu" ? (
              <NavLink
                className="header__menu-link header__menu-link--exit"
                to="/"
                onClick={() => setIsMenuShown(false)}
              />
            ) : (
              <NavLink
                className="header__menu-link header__menu-link--entry"
                to="/menu"
                onClick={() => setIsMenuShown(true)}
              />
            )}
          </div>
          <nav className="header__navigation">
            <ul className="header__list">
              {topBarLinks.map((item) => (
                <li className="header__list-item" key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => {
                      return classNames("header__link", {
                        "header__link--active": isActive,
                      });
                    }}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__cart">
            <NavLink className="header__cart-link" to={"/cart"} />
            <p className="header__cart-quantity">
              {Object.entries(cartProducts)?.length}
            </p>
          </div>
        </div>
      </div>
      {showBanner && (
        <div className="header__hero">
          <p className="header__hero-subtitle">Vinyla Corner</p>
          <h1 className="header__hero-title">
            Vinyla Corner: Where Music Spins <br />
            It's <span className="header__hero-title-bold">Best Stories!</span>
          </h1>
          <p className="header__hero-tagline">
            Dive into timeless melodies at our vinyl shop, where classic tunes
            await
          </p>
          <button className="header__hero-button">
            <NavLink to="/shop" className="header__hero-button__link">
              Buy
            </NavLink>
          </button>
        </div>
      )}
    </header>
  );
};
