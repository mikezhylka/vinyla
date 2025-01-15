import { products } from "../../../api/products";
import { Product } from "../../../types/Product";

const popularProductsIds: number[] = [1, 2, 3, 19];

export const popularProducts: Product[] = products.filter((product) =>
  popularProductsIds.includes(product.id)
);