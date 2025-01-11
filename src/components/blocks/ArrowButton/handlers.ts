import cn from "classnames";
import { Product } from "../../../types/Product";
import styles from "../../Pages/ProductPage/index.module.scss";

export function addPaginationBtnClass(
  type: "prev" | "next",
  pages: number,
  pageParam: number | null
) {
  return type === "prev"
    ? cn("pagination__prev-page", {
        "pagination__prev-page--disabled": pageParam! <= 1,
      })
    : cn("pagination__next-page", {
        "pagination__next-page--disabled": pageParam! >= pages,
      });
}

export function addRecommendationsBtnClass(
  type: "prev" | "next",
  recommendedPage: number,
  recommendedProducts?: Product[]
) {
  return type === "prev"
    ? cn(
        styles["recommended-products__swipe"],
        styles["recommended-products__swipe--prev"],
        {
          [styles["recommended-products__swipe--prev--disabled"]]:
            recommendedPage === 1,
        }
      )
    : cn(
        styles["recommended-products__swipe"],
        styles["recommended-products__swipe--next"],
        {
          [styles["recommended-products__swipe--next--disabled"]]:
            recommendedPage >= Math.ceil(recommendedProducts!.length / 4),
        }
      );
}