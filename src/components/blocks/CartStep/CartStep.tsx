import cn from "classnames";
import { useCartContext } from "../../../contexts/Cart/useCartContext";
import { CartStep as CartStepType } from "../../../types/CartStep";
import styles from "./CartStep.module.scss";

type Props = {
  currentStep: CartStepType;
};

export const CartStep: React.FC<Props> = ({ currentStep }) => {
  const { activeCartStep } = useCartContext();
  const { stepNumber, title } = currentStep;
  const isStepActive = stepNumber === activeCartStep;
  const isStepCompleted = activeCartStep > stepNumber;

  function handleAddingClassName(className: string) {
    return cn(styles[className], {
      [styles[`${className}--active`]]: isStepActive,
      [styles[`${className}--completed`]]: isStepCompleted,
    });
  }

  return (
    <div className={handleAddingClassName("cart-steps__step")}>
      <div className={handleAddingClassName("cart-steps__step-number")}>
        {!isStepCompleted && stepNumber}
      </div>
      <p className={handleAddingClassName("cart-steps__title")}>
        {title}
      </p>
    </div>
  );
};
