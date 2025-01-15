import { Link } from "react-router";
import { useProductContext } from "../../../../../contexts/Product/useProductContext";
import "./index.scss";

export const AddedToCart: React.FC = () => {
  const { setIsAddedToCart } = useProductContext();

  return (
    <div className="added-to-cart">
      <p className="added-to-cart__text">
        Your product has been added to{" "}
        <Link className="added-to-cart__link" to="/cart">
          cart
        </Link>
      </p>
      <button
        className="added-to-cart__exit"
        onClick={() => setIsAddedToCart(false)}
      />
    </div>
  );
};
