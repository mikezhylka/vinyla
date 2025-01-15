import { ProductCart } from "../../../../blocks/ProductCart/ProductCart";
import { popularProducts } from "../../config";
import "./products.scss";

export const Products: React.FC = () => (
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
