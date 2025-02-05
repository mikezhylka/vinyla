import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { Product as ProductType } from "../../../types/Product";
import { Loader } from "../Loader/Loader";
import styles from "./ProductCart.module.scss";

type Props = {
  product: ProductType;
  cn: string;
};

export const ProductCart: FC<Props> = ({ product, cn }) => {
  const { id, title, photo, price } = product;
  const { setRecommendedPage } = useProductContext();
  const { setFavProducts } = useAppContext();

  const [isCartClicked, setIsCartClicked] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUsedInFavorites = pathname === "/favorites";

  useEffect(() => {
    if (isCartClicked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setRecommendedPage(1);
      setIsCartClicked(false);
    }
  }, [isCartClicked, setRecommendedPage]);

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => setShowLoader(false), 500);
    }
  }, [showLoader]);

  function handleProductDeletion(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFavProducts((prev) => prev.filter((product) => product.id !== id));
    setShowLoader(true);
  }

  const normalizedCn = cn.includes(" ") ? cn.split(" ") : [cn]; // used to correctly apply module styles

  return (
    <article
      className={classNames(normalizedCn.map((cn) => styles[cn]))}
      key={id}
      onClick={() => {
        setIsCartClicked(true);
        navigate(`/shop/product/${id}`);
      }}
    >
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <img className={styles["product__photo"]} src={photo} alt={title} />
          {isUsedInFavorites && (
            <button
              className={styles["product__delete"]}
              onClick={handleProductDeletion}
            />
          )}
          <h3 className={styles["product__title"]}>{title}</h3>
          <p className={styles["product__price"]}>{`${price} $`}</p>
        </>
      )}
    </article>
  );
};
