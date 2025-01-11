import { products } from "../../../api/products";
import { Product } from "../../../types/Product";

const IDS: number[] = [1, 2, 3, 19];

export const MAIN_PRODUCTS: Product[] = products.filter((product) =>
  IDS.includes(product.id)
);