import { ProductCart } from "../../../../blocks/ProductCart/ProductCart";
import { MAIN_PRODUCTS } from "../../config";
import "./products.scss";

export const Products: React.FC = () => {
  return (
    <>
      {MAIN_PRODUCTS.map((product, index) => (
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
