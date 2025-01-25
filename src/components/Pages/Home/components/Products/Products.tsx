import { products } from "../../../../../api/products";
import { popularProductsIds } from "../../../../../constants/products";
import { Product } from "../../../../../types/Product";
import { ProductCart } from "../../../../blocks/ProductCart";
import "./products.scss";

export const Products: React.FC = () => {
  const popularProducts: Product[] = products.filter((product) =>
    popularProductsIds.includes(product.id)
  );

  return (
    <>
      {popularProducts.map((product, index) => (
        <ProductCart
          key={product.id}
          product={product}
          index={index}
          className={"popular-positions__product product product--"}
        />
      ))}
    </>
  );
};
