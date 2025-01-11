import { SetStateAction } from "react";
import { Link } from "react-router";
import "./index.scss";

type Props = {
  setIsAddedToCart: React.Dispatch<SetStateAction<boolean>>;
};

export const AddedToCart: React.FC<Props> = ({ setIsAddedToCart }) => (
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
