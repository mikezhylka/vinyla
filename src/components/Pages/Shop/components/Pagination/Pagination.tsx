import { NavLink } from "react-router";
import { products } from "../../../../../api/products";
import { ArrowButton } from "../../../../blocks/ArrowButton/ArrowButton";
import { productsPerPage } from "../../config";
import { addPageLinkClassName } from "./handlers";
import "./index.scss";

type Props = {
  page: number;
};

export const Pagination: React.FC<Props> = ({ page }) => {
  const pages = Math.ceil(products.length / productsPerPage);
  const currentPage = page;

  return (
    <div className="pagination">
      <ArrowButton
        cn="pagination__arrow arrow arrow--pagination arrow--pagination--prev"
        usedFor="pagination"
        type="prev"
      />

      <div className="pagination__pages">
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <NavLink
            key={page}
            className={addPageLinkClassName(currentPage, page)}
            to={`/shop/pages/${page}`}
          >
            {page}
          </NavLink>
        ))}
      </div>

      <ArrowButton
        cn="pagination__arrow arrow arrow--pagination arrow--pagination--next"
        usedFor="pagination"
        type="next"
      />
    </div>
  );
};
