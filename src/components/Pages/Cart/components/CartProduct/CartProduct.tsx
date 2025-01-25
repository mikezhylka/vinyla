import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useNavigate } from "react-router";
import { tabletWidth } from "../../../../../config";
import { useCartContext } from "../../../../../contexts/Cart/useCartContext";
import { CartProduct as CartProductType } from "../../../../../types/CartProduct";
import { ProductQuantity } from "../../../../blocks/ProductQuantity";
import styles from "./index.module.scss";

type Props = {
  product: CartProductType;
  usedFor: "shoppingCart" | "checkoutDetails";
};

export const CartProduct: React.FC<Props> = ({ product, usedFor }) => {
  const { setCartProducts, setCartQuantities } = useCartContext();
  const { width } = useWindowSize();
  const { price, title, photo } = product;
  const navigate = useNavigate();
  const isOnMobile = width && width < tabletWidth;

  const navigateToProduct = () => navigate(`/shop/product/${product.id}`);

  function handleProductDeletion() {
    setCartProducts((prev) =>
      Object.values(prev).filter((prevProduct) => prevProduct.id !== product.id)
    );

    setCartQuantities((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[product.id];
      return updatedQuantities;
    });
  }

  return usedFor === "shoppingCart" ? (
    <tr
      className={cn(styles["cart-table__product-row"], {
        [styles["cart-table__product-row--mobile"]]: isOnMobile,
      })}
    >
      {isOnMobile ? (
        <th scope="row" className={styles.th}>
          <article
            className={cn(
              styles["cart-table__product"],
              styles["cart-table__product--mobile"]
            )}
          >
            <img
              className={styles["product__photo"]}
              src={photo}
              alt={title}
              onClick={navigateToProduct}
            />
            <div className={styles["product__mobile-wrap"]}>
              <div className={styles["product__wrap"]}>
                <h3
                  className={cn(
                    styles["product__title"],
                    styles["product__title--mobile"]
                  )}
                  onClick={navigateToProduct}
                >
                  {title}
                </h3>
                <p className={styles["product__price"]}>${price}</p>
              </div>
              <div className={styles["product__wrap--mobile"]}>
                <ProductQuantity product={product} />
                <img
                  className={styles["cart-table__delete-icon"]}
                  src="./images/icons/trash.svg"
                  alt="Delete product"
                  onClick={handleProductDeletion}
                />
              </div>
            </div>
          </article>
        </th>
      ) : (
        <>
          <th scope="row" className={styles.th}>
            <article className={styles["cart-table__product"]}>
              <img
                className={styles["product__photo"]}
                src={photo}
                alt={title}
                onClick={navigateToProduct}
              />
              <div className={styles["product__wrap"]}>
                <h3
                  className={styles["product__title"]}
                  onClick={navigateToProduct}
                >
                  {title}
                </h3>
                <p className={styles["product__price"]}>${price}</p>
              </div>
            </article>
          </th>
          <td className={styles["cart-table__quantity"]}>
            <ProductQuantity product={product} />
          </td>
          <td className={styles["cart-table__delete"]}>
            <img
              className={styles["cart-table__delete-icon"]}
              src="./images/icons/trash.svg"
              alt="Delete product"
              onClick={handleProductDeletion}
            />
          </td>
        </>
      )}
    </tr>
  ) : (
    <article className={styles["order-summary__product"]}>
      <img
        className={styles["product__photo"]}
        src={photo}
        alt={title}
        onClick={navigateToProduct}
      />
      <div
        className={cn(
          styles["product__wrap--in-checkout"],
          styles["product__wrap"]
        )}
      >
        <h3 className={styles["product__title"]} onClick={navigateToProduct}>
          {title}
        </h3>
        <p className={styles["product__price"]}>${price}</p>
        <div className={styles["product__quantity-and-delete-wrap"]}>
          <div className={styles["product__quantity"]}>
            <ProductQuantity product={product} />
          </div>
          <div className={styles["product__delete"]}>
            <img
              className={styles["cart-table__delete-icon"]}
              src="./images/icons/trash.svg"
              alt="Delete product"
              onClick={handleProductDeletion}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
