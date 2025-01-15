import classNames from "classnames";
import { SetStateAction } from "react";
import { products } from "../../../api/products";
import { Product } from "../../../types/Product";
import styles from "./index.module.scss";

export function toggleFavorite(
  currentProduct: Product,
  setFavProducts: React.Dispatch<SetStateAction<Product[]>>
) {
  setFavProducts((prev) => {
    const isAlreadyInState = prev?.find(
      (prod) => prod.id === currentProduct.id
    );

    return !isAlreadyInState
      ? [...(prev || []), currentProduct]
      : [...(prev?.filter((prod) => prod.id !== currentProduct.id) || [])];
  });
}

export function addFavIcon(product: Product, favProducts: Product[] | null) {
  const isProductOnFavorites = favProducts?.find(
    (favProd: Product) => favProd === product
  );

  const icon = isProductOnFavorites ? "heart-filled.svg" : "heart.svg";

  return `/src/images/icons/${icon}`;
}

export function calculateRecommendedProducts(currentProduct: Product) {
  const productsWithIdenticalGenre = products.filter(
    (product) =>
      product.id !== currentProduct.id && product.genre === currentProduct.genre
  );

  const popularProducts = products.filter(
    (product) => product.id !== currentProduct.id && product.genre === "Popular"
  );

  const recommendedProducts =
    productsWithIdenticalGenre.length > 12
      ? productsWithIdenticalGenre.slice(0, 12)
      : [...productsWithIdenticalGenre, ...popularProducts].slice(0, 12);

  return recommendedProducts;
}

export function addSwipeButtonClassName(
  recommendedPage: number,
  recommendedProducts?: Product[]
) {
  return !recommendedProducts
    ? classNames(
        styles["recommended-products__swipe"],
        styles["recommended-products__swipe--prev"],
        {
          [styles["recommended-products__swipe--prev--disabled"]]:
            recommendedPage === 1,
        }
      )
    : classNames(
        styles["recommended-products__swipe"],
        styles["recommended-products__swipe--next"],
        {
          [styles["recommended-products__swipe--next--disabled"]]:
            recommendedPage >= Math.ceil(recommendedProducts.length / 4),
        }
      );
}

type T = {
  recommendedPage: number;
  recProdsPerPage: number;
};

export function setSliceStart({ recommendedPage, recProdsPerPage }: T): number {
  return recProdsPerPage * recommendedPage - recProdsPerPage;
}

export function setSliceEnd({ recommendedPage, recProdsPerPage }: T): number {
  return recProdsPerPage * recommendedPage;
}
