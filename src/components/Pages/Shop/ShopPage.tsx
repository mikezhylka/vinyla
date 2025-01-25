import classNames from "classnames";
import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";
import { products } from "../../../api/products";
import { useScroll } from "../../../hooks/useScroll";
import { Pagination } from "./components/Pagination";
import { Products } from "./components/Products";
import { genresList, productsPerPage } from "./config";
import "./index.scss";

export const ShopPage: React.FC = () => {
  const [appliedGenre, setAppliedGenre] = useState("");
  const navigate = useNavigate();
  const { genre, page } = useParams();
  const { pathname } = useLocation();
  const behavior = pathname === "/shop" ? "instant" : "smooth";

  useScroll({ options: { top: 0, behavior }, deps: [page, pathname] });

  const normalizedPage = page ? +page : 1;

  function addGenresItemClassName(genre: string) {
    return classNames(`genres__item genres__item--${genre.toLowerCase()}`, {
      "genres__item--with-cancel": appliedGenre === genre,
    });
  }

  const showPagination: boolean = genre
    ? products.filter((product) => product.genre === genre).length >
      productsPerPage
    : products.length > productsPerPage;

  return (
    <main className="main">
      <section className="genres">
        <div className="genres__title-wrap">
          <h5 className="genres__title">Genre</h5>
          <img
            className="genres__stripe"
            src="./images/icons/stripe.svg"
            alt=""
          />
        </div>
        <nav className="genres__nav">
          <ul className="nav__list">
            {genresList.map((genre) => (
              <li key={genre} className={addGenresItemClassName(genre)}>
                <NavLink
                  className="genres__link"
                  to={`/shop/genres/${genre.toLowerCase()}`}
                  onClick={() => setAppliedGenre(genre)}
                >
                  {genre}
                </NavLink>
                <button
                  className={classNames("genres__cancel", {
                    "genres__cancel--active": appliedGenre === genre,
                  })}
                  onClick={() => {
                    navigate("/shop");
                    setAppliedGenre("");
                  }}
                ></button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <Products genre={genre} page={normalizedPage} />
      {showPagination && <Pagination page={normalizedPage} />}
    </main>
  );
};
