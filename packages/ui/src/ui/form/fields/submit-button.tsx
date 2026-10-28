import { useSelector } from "@tanstack/react-form";
import { useContext } from "react";
import { formHookContexts } from "#/internal/form-context";
import type { ButtonProps } from "#/ui/button";
import { Button } from "#/ui/button";

export type SubmitButtonProps = Omit<ButtonProps, "onPress" | "title"> & {
  title?: string;
};

const DEFAULT_SUBMIT_TITLE = "Submit";
const OUTSIDE_FORM_ERROR =
  "@invid/ui: form.SubmitButton must be rendered inside <form.AppForm>. Wrap the whole form in <form.AppForm>.";

function useSubmitForm() {
  const form = useContext(formHookContexts.formContext);

  if (!form) {
    throw new Error(OUTSIDE_FORM_ERROR);
  }

  return form;
}

function selectIsSubmitting(state: { isSubmitting: boolean }) {
  return state.isSubmitting;
}

export function SubmitButton({
  title = DEFAULT_SUBMIT_TITLE,
  accessibilityState,
  disabled,
  ...buttonProps
}: SubmitButtonProps) {
  const form = useSubmitForm();
  const isSubmitting = useSelector(form.store, selectIsSubmitting);
  const submitAccessibilityState = {
    ...accessibilityState,
    busy: isSubmitting,
  };

  function handlePress() {
    void form.handleSubmit();
  }

  return (
    <Button
      {...buttonProps}
      accessibilityState={submitAccessibilityState}
      disabled={disabled === true || isSubmitting}
      onPress={handlePress}
      title={title}
    />
  );
}
