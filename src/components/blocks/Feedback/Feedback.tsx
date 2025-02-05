import cn from "classnames";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { Comment } from "../../../types/Comment";
import { Product } from "../../../types/Product";
import { Stars } from "../Stars/Stars";
import styles from "./Feedback.module.scss";
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
  const { isOnDesktop } = useAppContext();

  const commentsLength = isOnDesktop && currentProduct?.comments.length;
  const commentIndex =
    isOnDesktop &&
    currentProduct?.comments.findIndex((item) => item.id === comment?.id);

  const minCommentsForAnimation = 3;
  const hasEnoughCommentsForAnimation =
    isOnDesktop && commentsLength && commentsLength > minCommentsForAnimation;

  return isProductPageOpened ? (
    <article
      className={cn(styles["feedback"], styles["feedback--on-product-page"], {
        [styles["feedback--animation"]]: hasEnoughCommentsForAnimation,
      })}
      style={handleFeedbackAnimation(commentsLength, commentIndex)}
    >
      <img
        className={styles["feedback__user-logo--on-product-page"]}
        src="./images/icons/user-white.svg"
        alt="User logo"
      />
      <div className={styles["feedback__user--on-product-page"]}>
        <p className={styles["feedback__description--on-product-page"]}>
          {addFeedbackDescription(comment, isOnDesktop)}
        </p>
        <div className={styles["feedback__rating--on-product-page"]}>
          <Stars currentComment={comment} />
          <p className={styles["feedback__rate-text"]}>{comment?.rate}</p>
        </div>
        <p className={styles["feedback__username--on-product-page"]}>
          {comment?.name}
        </p>
      </div>
    </article>
  ) : (
    <article
      className={cn(styles["feedback"], styles[`feedback__${feedback?.id}`])}
    >
      <div className={styles["feedback__user"]}>
        <img
          className={styles["feedback__user-logo"]}
          src="./images/icons/user-white.svg"
          alt="User logo"
        />
        <p className={styles["feedback__username"]}>{feedback?.name}</p>
      </div>
      <p className={styles["feedback__description"]}>{feedback?.description}</p>
    </article>
  );
};
