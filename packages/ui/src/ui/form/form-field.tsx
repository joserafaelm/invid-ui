import { useSelector } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { formHookContexts } from "#/internal/form-context";
import { Container } from "#/ui/container";
import { P } from "#/ui/p";

/**
 * `useFieldContext` returns the field of the surrounding `form.AppField`, and
 * `useFormContext` the form of the surrounding `form.AppForm`. Use them to
 * build custom field and form components for `extendForm`.
 */
export const { useFieldContext, useFormContext } = formHookContexts;

export type FormFieldProps = {
  label: string;
  /** Helper text shown under the control. */
  description?: string | undefined;
  children: ReactNode;
};

function selectHasSubmitted(state: { submissionAttempts: number }) {
  return state.submissionAttempts > 0;
}

function toErrorMessage(error: unknown, fieldName: string): string | undefined {
  if (error === undefined || error === null || error === "") {
    return undefined;
  }
  if (typeof error === "string") {
    return error;
  }
  if (
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  throw new Error(
    `@invid/ui: the validation error for field "${fieldName}" is not text. Return a string from the validator, or use a schema whose issues have a message.`,
  );
}

/**
 * Returns the message to show for the surrounding field, or `undefined`.
 * Errors stay hidden until the field loses focus or the form is submitted, then
 * update as the value changes.
 */
export function useFieldError(): string | undefined {
  const field = useFieldContext<unknown>();
  const hasSubmitted = useSelector(field.form.store, selectHasSubmitted);
  const { errors, isBlurred } = field.state.meta;

  if (!isBlurred && !hasSubmitted) {
    return undefined;
  }

  for (const error of errors) {
    const message = toErrorMessage(error, field.name);
    if (message !== undefined) {
      return message;
    }
  }

  return undefined;
}

/**
 * Lays out a field's label, control, description, and error message. Render
 * it inside `form.AppField`, around the control of a custom field component.
 */
export function FormField({ label, description, children }: FormFieldProps) {
  const error = useFieldError();
  const descriptionText =
    description === undefined ? null : <P variant="muted">{description}</P>;
  const errorText =
    error === undefined ? null : (
      <P
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
        variant="danger"
      >
        {error}
      </P>
    );

  return (
    <Container variant="section">
      <P variant="label">{label}</P>
      {children}
      {descriptionText}
      {errorText}
    </Container>
  );
}
