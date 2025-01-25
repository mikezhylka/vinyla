import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { useEffect, useState } from "react";
import { desktopWidth } from "../../../config";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { Comment } from "../../../types/Comment";
import { Product } from "../../../types/Product";
import { Stars } from "../Stars/Stars";
import "./feedback.scss";
import { addFeedbackDescription, handleFeedbackAnimation } from "./handlers";

type Props = {
  feedback?: Omit<Comment, "rate">;
  comment?: Comment;
  currentProduct?: Product;
};

export const Feedback: React.FC<Props> = ({
  feedback,
  comment,
  currentProduct,
}) => {
  const { isProductPageOpened } = useProductContext();
  const [isOnDesktop, setIsOnDesktop] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width) setIsOnDesktop(width >= desktopWidth);
  }, [width]);

  const commentsLength = isOnDesktop && currentProduct?.comments.length;
  const commentIndex =
    isOnDesktop &&
    currentProduct?.comments.findIndex((item) => item === comment);

  return isProductPageOpened ? (
    <article
      className={cn("feedback", "feedback--on-product-page", {
        "feedback--animation":
          commentsLength && commentsLength > 3 && isOnDesktop,
      })}
      style={handleFeedbackAnimation(commentsLength, commentIndex)}
    >
      <img
        className="feedback__user-logo--on-product-page"
        src="./images/icons/user-white.svg"
        alt="User logo"
      />
      <div className="feedback__user--on-product-page">
        <p className="feedback__description--on-product-page">
          {addFeedbackDescription(comment, isOnDesktop)}
        </p>
        <div className="feedback__rating--on-product-page">
          <Stars currentComment={comment} />
          <p className="feedback__rate-text">{comment?.rate}</p>
        </div>
        <p className="feedback__username--on-product-page">{comment?.name}</p>
      </div>
    </article>
  ) : (
    <article className={`feedback feedback__${feedback?.id}`}>
      <div className="feedback__user">
        <img
          className="feedback__user-logo"
          src="./images/icons/user-white.svg"
          alt="User logo"
        />
        <p className="feedback__username">{feedback?.name}</p>
      </div>
      <p className="feedback__description">{feedback?.description}</p>
    </article>
  );
};
