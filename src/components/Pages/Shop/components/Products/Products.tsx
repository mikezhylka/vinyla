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
    const sliceStart = page === 1 ? 0 : (page - 1) * productsPerPage;
    const sliceEnd = page * productsPerPage;

    return filteredProducts.slice(sliceStart, sliceEnd);
  }, [filteredProducts, page]);

  return (
    <section className="products">
      {renderedProducts.map((product) => (
        <ProductCart
          key={product.id}
          product={product}
          cn="products__product product"
        />
      ))}
    </section>
  );
};
