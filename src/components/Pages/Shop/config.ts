import { products } from "../../../api/products";

export const genresList = [
  "Jazz",
  "Christmas",
  "Popular",
  "Blues",
  "Metal",
  "Electronic",
  "Folk",
  "Rock",
  "Classical",
];

export const productsPerPage = 20;
export const pagesAmount = Math.ceil(products.length / productsPerPage);
