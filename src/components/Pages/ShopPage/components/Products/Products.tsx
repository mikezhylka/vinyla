import { useMemo } from "react";
import { products } from "../../../../../api/products";
import { ProductCart } from "../../../../blocks/ProductCart/ProductCart";
import { productsPerPage } from "../../config";
import "./index.scss";

type Props = {
  page: number;
  genre: string | undefined;
};

export const Products: React.FC<Props> = ({ page, genre }) => {
  const filteredProducts = useMemo(() => {
    return genre
      ? products.filter((product) => product.genre.toLowerCase() === genre)
      : products;
  }, [genre]);


  const renderedProducts = useMemo(() => {
    const start = page === 1 ? 0 : (page - 1) * productsPerPage;
    const end = page * productsPerPage;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  return (
    <section className="products">
      {renderedProducts.map((product) => (
        <ProductCart
          key={product.id}
          product={product}
          className="products__product product"
        />
      ))}
    </section>
  );
};
