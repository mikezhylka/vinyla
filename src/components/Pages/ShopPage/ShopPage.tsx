import classNames from "classnames";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { products } from "../../../api/products";
import { Pagination } from "./components/Pagination";
import { Products } from "./components/Products";
import { genresList, productsPerPage } from "./config";
import "./index.scss";

export const ShopPage: React.FC = () => {
  const { genre, page } = useParams();
  const [appliedGenre, setAppliedGenre] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigate = useNavigate();
  const normalizedPage = page ? +page : 1;

  function addGenresItemClassName(genre: string) {
    return classNames(`genres__item genres__item--${genre.toLowerCase()}`, {
      "genres__item--with-cancel": appliedGenre === genre,
    });
  }

  const showPagination = genre
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
            src="/src/images/icons/stripe.svg"
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
