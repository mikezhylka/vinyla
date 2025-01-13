import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useAppContext } from "../../../context/useAppContext";
import { CartProduct } from "../../Pages/CartPage/components/CartProduct";
import { addTableTitleClassName } from "../../Pages/CartPage/handlers";
import styles from "./index.module.scss";

export const ProductsTable: React.FC = () => {
  const { cartProducts, activeCartStep } = useAppContext();
  const windowSize = useWindowSize();
  const { width } = windowSize;
  const onCheckout = activeCartStep === 2;
  const notOnMobile = width && width > 640;

  return (
    <table
      className={cn(styles["cart-form__table"], {
        [styles["cart-form__table--checkout"]]: onCheckout,
      })}
    >
      <thead className={styles["cart-form__table-head"]}>
        <tr className={styles["cart-form__table-titles"]}>
          <th scope="col" className={addTableTitleClassName("product")}>
            Product
          </th>
          {(notOnMobile || onCheckout) && (
            <>
              <th scope="col" className={addTableTitleClassName("quantity")}>
                Quantity
              </th>
              <th scope="col" className={addTableTitleClassName("delete")}>
                Delete
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody className={styles["cart-form__table-body"]}>
        {Object.values(cartProducts).map((product) => (
          <CartProduct
            key={product.id}
            product={product}
            usedFor="shoppingCart"
          />
        ))}
      </tbody>
    </table>
  );
};
