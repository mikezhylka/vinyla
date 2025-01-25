import cn from "classnames";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import { useCartContext } from "../../../contexts/Cart/useCartContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { CartProduct } from "../../../types/CartProduct";
import styles from "./index.module.scss";

type Props = {
  product?: CartProduct;
};

export const ProductQuantity: React.FC<Props> = ({ product }) => {
  const { cartQuantities, setCartQuantities, setCartProducts } =
    useCartContext();
  const { pageProductQty, setPageProductQty, isProductInCart } =
    useProductContext();
  const { pathname } = useLocation();
  const onCartPage = pathname === "/cart";

  // Initialize cart quantities if product is present
  useEffect(() => {
    if (product && !(product.id in cartQuantities)) {
      setCartQuantities((prev) => ({
        ...prev,
        [product.id]: product.quantity,
      }));
    }
  }, [product, cartQuantities, setCartQuantities]);

  useEffect(() => {}, [cartQuantities]);

  const changeProductQuantity = useCallback(
    (operation: "increment" | "decrement") => {
      if (onCartPage && product) {
        setCartQuantities((prev) => ({
          ...prev,
          [product.id]:
            operation === "decrement"
              ? prev[product.id] - 1
              : prev[product.id] + 1,
        }));

        setCartProducts((prev) => ({
          ...prev,
          [product.id]: {
            ...prev[product.id],
            quantity:
              operation === "decrement"
                ? prev[product.id].quantity - 1
                : prev[product.id].quantity + 1,
          },
        }));
      } else {
        setPageProductQty((prev) =>
          operation === "decrement" ? prev - 1 : prev + 1
        );
      }
    },
    [product, onCartPage, setCartQuantities, setPageProductQty, setCartProducts]
  );

  const displayedQuantity =
    onCartPage && product ? cartQuantities[product.id] : pageProductQty;

  const isDecrementDisabled = displayedQuantity === 1;

  return (
    <div className={styles["product__quantity-wrap"]}>
      <button
        type="button"
        className={cn(styles["product__quantity-decrement"])}
        disabled={isDecrementDisabled}
        onClick={() => changeProductQuantity("decrement")}
      >
        -
      </button>
      <span
        className={cn(styles["product__quantity"], {
          [styles["product__quantity--inactive"]]:
            isProductInCart && isDecrementDisabled,
        })}
      >
        {displayedQuantity}
      </span>
      <button
        type="button"
        className={cn(styles["product__quantity-increment"])}
        onClick={() => changeProductQuantity("increment")}
      >
        +
      </button>
    </div>
  );
};
