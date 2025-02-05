import { useEffect } from "react";
import { useAppContext } from "../contexts/App/useAppContext";
import { ConfirmationFormState } from "../types/ConfirmationFormState";
import { ContactFormState } from "../types/ContactFormState";

type State = ConfirmationFormState | ContactFormState;

export function useIsSubmitDisabled(state: State) {
  const { setIsSubmitDisabled } = useAppContext();

  useEffect(() => {
    const allInputsSuccessfullyFilled: boolean = Object.values(state).every(
      (input) => !input.error.length && input.value.length > 1
    );
  
    setIsSubmitDisabled(!allInputsSuccessfullyFilled);
  }, [state, setIsSubmitDisabled]);
}
