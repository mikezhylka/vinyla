import classNames from "classnames";
import { Comment } from "../../../types/Comment";
import { Product } from "../../../types/Product";

import styles from "../../Pages/Product/index.module.scss";

type currObj = Product | Comment;

export function calculateAvgRate(product: Product): number {
  return (
    product.comments.reduce((acc, product) => acc + product.rate, 0) /
    product.comments.length
  );
}

export function addStarClassName(
  currentObject: currObj,
  starIndex: number,
  usedFor: string
) {
  const isStarFilled =
    usedFor === "product"
      ? starIndex + 0.5 <= calculateAvgRate(currentObject as Product)
      : starIndex < (currentObject as Comment).rate; // for comment star

  const isStarHalfFilled =
    usedFor === "product" &&
    starIndex + 1 - calculateAvgRate(currentObject as Product) < 1;

  let classNameForProductStar = classNames(
    styles["product__star"],
    styles["product__star--empty"]
  );

  if (isStarFilled) {
    classNameForProductStar = classNames(
      styles["product__star"],
      styles["product__star--filled"]
    );
  } else if (isStarHalfFilled) {
    classNameForProductStar = classNames(
      styles["product__star"],
      styles["product__star--half-filled"]
    );
  }

  const classNameForCommentStar = isStarFilled
    ? "feedback__star feedback__star--filled"
    : "feedback__star feedback__star--empty";

  return usedFor === "product"
    ? classNameForProductStar
    : classNameForCommentStar;
}

export function addStarPicture(
  currentObj: currObj,
  starIndex: number,
  usedFor: string
) {
  const isStarHalfFilled =
    usedFor === "product" &&
    calculateAvgRate(currentObj as Product) - starIndex < 1 &&
    calculateAvgRate(currentObj as Product) - starIndex > 0;

  const isStarFilled =
    usedFor === "product"
      ? starIndex + 1 <= calculateAvgRate(currentObj as Product)
      : starIndex < (currentObj as Comment).rate;

  let icon = "";

  if (isStarHalfFilled) {
    icon = "star-half-filled.svg";
  } else if (isStarFilled) {
    icon = "star-filled.svg";
  } else {
    icon = "star-empty.svg";
  }

  return `/public/images/icons/${icon}`;
}
