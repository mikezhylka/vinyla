import { infiniteScrollDuration } from "../../../constants/breakpoints";
import { Comment } from "../../../types/Comment";

export function addFeedbackDescription(
  comment: Comment | undefined,
  isOnDesktop: boolean
) {
  let feedbackCharsSum = 0;

  return comment && comment.description.length > 45 && isOnDesktop
    ? comment.description
        .split(" ")
        .map((word) => {
          feedbackCharsSum += word.length;

          return feedbackCharsSum < 45 ? word + " " : "";
        })
        .join(" ") + "..."
    : comment?.description;
}

export function handleFeedbackAnimation(
  commentsLength: number | false | undefined,
  commentIndex: number | false | undefined
) {
  return commentsLength &&
    commentsLength > 3 &&
    typeof commentIndex === "number"
    ? {
        animationDelay: `calc(${infiniteScrollDuration}s / ${commentsLength} * (${
          commentsLength - commentIndex
        }) * -1)`,
        left: `max(calc(546px * ${commentsLength}), 100%)`,
      }
    : {};
}
