import { useFieldContext, useFieldError } from "#/ui/form/form-field";

type FieldAccessibilityInput = {
  label: string;
  description: string | undefined;
  accessibilityLabel: string | undefined;
  accessibilityHint: string | undefined;
};

function describeValue(value: unknown) {
  return value === null ? "null" : typeof value;
}

function invalidValueError(
  component: string,
  fieldName: string,
  expected: string,
  value: unknown,
) {
  return new Error(
    `@invid/ui: field.${component} for "${fieldName}" needs ${expected}, but the form value is ${describeValue(value)}. Change "${fieldName}" in defaultValues, or use the field component that matches its type.`,
  );
}

export function useStringFieldValue(component: string) {
  const field = useFieldContext<unknown>();
  const { value } = field.state;

  if (value !== undefined && typeof value !== "string") {
    throw invalidValueError(
      component,
      field.name,
      "a string or undefined",
      value,
    );
  }

  return { field, value };
}

export function useNumberFieldValue(component: string) {
  const field = useFieldContext<unknown>();
  const { value } = field.state;

  if (value !== undefined && typeof value !== "number") {
    throw invalidValueError(
      component,
      field.name,
      "a number or undefined",
      value,
    );
  }

  return { field, value };
}

export function getFieldAccessibility(
  {
    label,
    description,
    accessibilityLabel,
    accessibilityHint,
  }: FieldAccessibilityInput,
  error: string | undefined,
) {
  const hints = [error, accessibilityHint ?? description].filter(
    (hint) => hint !== undefined && hint !== "",
  );

  return {
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityHint: hints.length > 0 ? hints.join(" ") : undefined,
  };
}

export function useTextControl(
  component: string,
  accessibilityInput: FieldAccessibilityInput,
) {
  const { field, value } = useStringFieldValue(component);
  const error = useFieldError();

  return {
    ...getFieldAccessibility(accessibilityInput, error),
    invalid: error !== undefined,
    onBlur: field.handleBlur,
    onChangeText: field.handleChange,
    value: value ?? "",
  };
}
