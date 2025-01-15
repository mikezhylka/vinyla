import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { Product as ProductType } from "../../../types/Product";
import { Loader } from "../Loader/Loader";
import { addProductCartClassName } from "./handlers";
import "./product-cart.scss";

type Props = {
  product: ProductType;
  index?: number;
  className: string;
};

export const ProductCart: React.FC<Props> = ({ product, index, className }) => {
  const { id, title, photo, price } = product;
  const { setRecommendedPage } = useProductContext();

  const [isCartClicked, setIsCartClicked] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartClicked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setRecommendedPage(1);
      setIsCartClicked(false);
    }
  }, [isCartClicked, setRecommendedPage]);

  setTimeout(() => setShowLoader(false), 500);

  return (
    <article
      className={addProductCartClassName(className, index)}
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
          <img className="product__photo" src={photo} alt={title} />
          <h3 className="product__title">{title}</h3>
          <p className="product__price">{`${price} $`}</p>
        </>
      )}
    </article>
  );
};
