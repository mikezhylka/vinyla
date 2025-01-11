import cn from "classnames";
import { useAppContext } from "../../../context/useAppContext";
import { CartStep as CartStepType } from "../../../types/CartStep";
import "./index.scss";

type Props = {
  currentStep: CartStepType;
};

export const CartStep: React.FC<Props> = ({ currentStep }) => {
  const { activeCartStep } = useAppContext();
  const { stepNumber, title } = currentStep;
  const isStepActive = stepNumber === activeCartStep;
  const isStepCompleted = activeCartStep > stepNumber;

  function handleAddingClassName(className: string) {
    return cn(className, {
      [`${className}--active`]: isStepActive,
      [`${className}--completed`]: isStepCompleted,
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
