import { FC } from "react";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useScroll } from "../../../hooks/useScroll";
import { Breadcrumbs } from "../../blocks/Breadcrumbs";
import { EmptyCategory } from "../../blocks/EmptyCategory/EmptyCategory";
import { ProductCart } from "../../blocks/ProductCart";
import styles from "./FavoritesPage.module.scss";

export const FavoritesPage: FC = () => {
  const { favProducts } = useAppContext();

  useScroll({ options: { top: 0, behavior: "instant" } });

  if (!favProducts?.length) {
    return <EmptyCategory page="favorites" />;
  }

  return (
    <main className={styles.main}>
      <Breadcrumbs disabledPath="favorites" />
      <section className={styles.favorites}>
        {favProducts.map((product) => (
          <ProductCart key={product.id} product={product} cn="product" />
        ))}
      </section>
    </main>
  );
};
