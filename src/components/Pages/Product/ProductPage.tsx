import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router";

// Contexts
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useCartContext } from "../../../contexts/Cart/useCartContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";

// API and Handlers
import { products } from "../../../api/products";
import { calculateAvgRate } from "../../blocks/Stars/handlers";
import {
  addFavIcon,
  calculateRecommendedProducts,
  setSliceEnd,
  setSliceStart,
  toggleFavorite,
} from "./handlers";

// Components
import { ArrowButton } from "../../blocks/ArrowButton";
import { Breadcrumbs } from "../../blocks/Breadcrumbs";
import { Feedback } from "../../blocks/Feedback";
import { ProductCart } from "../../blocks/ProductCart";
import { ProductQuantity } from "../../blocks/ProductQuantity";
import { Stars } from "../../blocks/Stars/Stars";
import { AddedToCart } from "./components/AddedToCart";

// Config and Types
import { CartProductAlias } from "../../../types/CartProductAlias";
import { Product } from "../../../types/Product";
import { productCharsBarTitles } from "./config";

// Styles
import { useScroll } from "../../../hooks/useScroll";
import styles from "./index.module.scss";


export const ProductPage: React.FC = () => {
  const {
    setIsProductPageOpened,
    recommendedPage,
    recProdsPerPage,
    setRecProdsPerPage,
    isAddedToCart,
    setIsAddedToCart,
    isProductInCart,
    setIsProductInCart,
    pageProductQty,
    setPageProductQty,
  } = useProductContext();
  const { cartProducts, setCartProducts, cartQuantities } = useCartContext();
  const { favProducts, setFavProducts } = useAppContext();

  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const { productId } = useParams();
  const { width } = useWindowSize();

  useScroll({options: {top: 0, behavior: "instant"}})

  useEffect(() => {
    setIsProductPageOpened(true);

    return () => setIsProductPageOpened(false);
  }, [setIsProductPageOpened]);

  useEffect(() => {
    if (width && width > 640) {
      setRecProdsPerPage(4);
    }

    if (width) {
      setIsOnDesktop(width >= 1440);
    }
  }, [width, setRecProdsPerPage]);

  useEffect(() => {
    if (productId && cartProducts[+productId]) {
      setIsProductInCart(true);
    }

    return () => setIsProductInCart(false);
  }, [cartProducts, productId, setIsProductInCart]);

  if (!productId) {
    return null;
  }

  const currentProduct = products.find((product) => product.id === +productId);

  if (!currentProduct) {
    return null;
  }

  const recommendedProducts = calculateRecommendedProducts(currentProduct);
  const averageRate = calculateAvgRate(currentProduct);

  function handleAddingProductToCart() {
    const { id } = currentProduct!;
    const isProductInCart = id in cartProducts;

    setCartProducts(
      (prev) =>
        ({
          ...prev,
          [id]: {
            ...currentProduct,
            quantity: isProductInCart
              ? cartQuantities[id] + pageProductQty
              : pageProductQty,
          },
        } as CartProductAlias)
    );

    setPageProductQty(1);
    setIsAddedToCart(true);
    setIsProductInCart(true);

    return setTimeout(() => setIsAddedToCart(false), 15000);
  }

  return (
    <main className="main">
      {isAddedToCart && <AddedToCart />}

      <Breadcrumbs />
      <article className={styles.product}>
        <div className={styles.product__wrap}>
          <img
            className={styles.product__photo}
            src={currentProduct?.photo}
            alt="Product"
          />
          <div className={styles.product__info}>
            <h3 className={styles.product__title}>{currentProduct?.title}</h3>
            <div className={styles["product__info-wrap"]}>
              <p className={styles.product__author}>{currentProduct?.author}</p>
              <div className={styles["product__rating-favorite-wrap"]}>
                <div className={styles.product__rate}>
                  <Stars currentProduct={currentProduct} />
                  <h5 className={styles["product__avg-rate"]}>
                    {averageRate.toFixed(1)}
                  </h5>
                </div>
                <img
                  className={styles["product__add-to-favorites"]}
                  src={addFavIcon(currentProduct, favProducts)}
                  alt="Add to favorites"
                  onClick={() => toggleFavorite(currentProduct, setFavProducts)}
                />
              </div>
              <div className={styles["product__price-quantity-wrap"]}>
                <h2 className={styles.product__price}>
                  {"$ " + currentProduct.price}
                </h2>
                <ProductQuantity />
              </div>
              <div className={styles.product__subcategories}>
                {currentProduct.subcategories.map((category) => (
                  <button
                    key={category}
                    className={styles.product__subcategory}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                className={styles["product__add-to-cart"]}
                onClick={handleAddingProductToCart}
                disabled={isProductInCart}
              >
                {isProductInCart ? "In cart" : "Add to cart"}
              </button>
            </div>
            <h3 className={styles.product__description}>Description</h3>
            <p className={styles["product__description-text"]}>
              {currentProduct.description}
            </p>
            <div className={styles.product__specs}>
              {productCharsBarTitles.map((value) => {
                const { apiKey, text, className } = value;
                const spec = currentProduct[apiKey as keyof Product];

                return (
                  <div
                    key={apiKey}
                    className={cn(
                      styles["product__spec-wrap"],
                      styles[`product__spec-wrap--${className}`]
                    )}
                  >
                    <h4
                      className={`${styles["product__spec-title"]} ${
                        styles[`product__spec-title--${className}`]
                      }`}
                    >
                      {text}
                    </h4>
                    <p className={styles["product__spec-value"]}>
                      {spec as ReactNode}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <section
          className={cn(styles["product__feedbacks"], {
            [styles["product__feedbacks--desktop"]]: isOnDesktop,
          })}
        >
          {currentProduct?.comments.map((comment) => (
            <Feedback
              key={comment.id}
              comment={comment}
              currentProduct={currentProduct}
            />
          ))}
        </section>
      </article>

      <section className={styles["recommended-products"]}>
        <h2 className={styles["recommended-products__title"]}>
          Recommended products
        </h2>
        <div className={styles["recommended-products__list"]}>
          <ArrowButton
            usedFor="recommendations"
            type="prev"
            recommendedProducts={recommendedProducts}
          />

          <div className={styles["recommended-products__products"]}>
            {recommendedProducts
              .slice(
                setSliceStart({ recommendedPage, recProdsPerPage }),
                setSliceEnd({ recommendedPage, recProdsPerPage })
              )
              .map((product) => (
                <ProductCart
                  key={product.id}
                  product={product as Product}
                  className={"product product--on-product-page"}
                />
              ))}
          </div>

          <ArrowButton
            usedFor="recommendations"
            type="next"
            recommendedProducts={recommendedProducts}
          />
        </div>
      </section>
    </main>
  );
};
