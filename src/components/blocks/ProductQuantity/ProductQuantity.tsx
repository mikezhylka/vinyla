import cn from "classnames";
import { SetStateAction, useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import { useAppContext } from "../../../context/useAppContext";
import { CartProduct } from "../../../types/CartProduct";
import styles from "./index.module.scss";

type Props = {
  product?: CartProduct;
  pageProductQty?: number;
  setPageProductQty?: React.Dispatch<SetStateAction<number>>;
  isProductInCart?: boolean;
};

export const ProductQuantity: React.FC<Props> = ({
  product,
  pageProductQty,
  setPageProductQty,
  isProductInCart,
}) => {
  const { cartQuantities, setCartQuantities } = useAppContext();
  const location = useLocation();
  const onCartPage = location.pathname === "/cart";

  useEffect(() => {
    if (product && !(product.id in cartQuantities)) {
      setCartQuantities((prev) => ({
        ...prev,
        [product.id]: product.quantity,
      }));
    }
  }, [product, cartQuantities, setCartQuantities]);

  const displayedQuantity =
    onCartPage && product ? cartQuantities[product.id] : pageProductQty;

  const changeProductQuantity = useCallback(
    (operation: "increment" | "decrement") => {
      return onCartPage && product
        ? ((): void => {
            setCartQuantities((prev) => ({
              ...prev,
              [product.id]:
                operation === "decrement"
                  ? product.quantity - 1
                  : product.quantity + 1,
            }));

            if (operation === "decrement") {
              product.quantity -= 1;
            } else {
              product.quantity += 1;
            }
          })()
        : operation === "decrement"
        ? setPageProductQty!((prev) => prev - 1)
        : setPageProductQty!((prev) => prev + 1);
    },
    [product, onCartPage, setCartQuantities, setPageProductQty]
  );

  return (
    <div className={styles["product__quantity-wrap"]}>
      <button
        className={cn(styles["product__quantity-decrement"], {
          [styles["product__quantity-decrement--disabled"]]:
            pageProductQty === 1 || product?.quantity === 1,
        })}
        disabled={product?.quantity === 1 || pageProductQty === 1}
        onClick={() => changeProductQuantity("decrement")}
      >
        -
      </button>
      <span className={styles.product__quantity}>{displayedQuantity}</span>
      <button
        className={styles["product__quantity-increment"]}
        onClick={() => changeProductQuantity("increment")}
        disabled={isProductInCart}
      >
        +
      </button>
    </div>
  );
};
