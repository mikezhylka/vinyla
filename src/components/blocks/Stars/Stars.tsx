import cn from "classnames";
import { useEffect, useState } from "react";
import { Comment } from "../../../types/Comment";
import { Product } from "../../../types/Product";
import { addStarClassName, addStarPicture } from "./handlers";

import styles from "../../pages/Product/index.module.scss";

type Props = {
  currentProduct?: Product;
  currentComment?: Comment;
};

type currObj = Product | Comment;

export const Stars: React.FC<Props> = ({ currentProduct, currentComment }) => {
  const [usedFor, setUsedFor] = useState("");
  const currentObject = currentComment || currentProduct;

  useEffect(() => {
    setUsedFor(currentProduct ? "product" : "comment");
  }, [currentComment, currentProduct]);

  if (!currentObject) {
    return null;
  }

  return (
    <div
      className={cn(
        usedFor === "product" ? styles["product__stars"] : "feedback__stars"
      )}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          key={index} // this array is static
          className={addStarClassName(currentObject as currObj, index, usedFor)}
          src={addStarPicture(currentObject as currObj, index, usedFor)}
          alt="Star"
        />
      ))}
    </div>
  );
};
