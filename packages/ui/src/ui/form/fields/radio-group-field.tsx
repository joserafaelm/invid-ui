import {
  getFieldAccessibility,
  useStringFieldValue,
} from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField, useFieldError } from "#/ui/form/form-field";
import type { RadioGroupProps } from "#/ui/form/radio-group";
import { RadioGroup } from "#/ui/form/radio-group";

type FieldOwnedProps =
  | "accessibilityLabel"
  | "invalid"
  | "onValueChange"
  | "value";

export type RadioGroupFieldProps = Omit<FormFieldProps, "children"> &
  Omit<RadioGroupProps, FieldOwnedProps> &
  Partial<Pick<RadioGroupProps, "accessibilityLabel">>;

export function RadioGroupField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...radioGroupProps
}: RadioGroupFieldProps) {
  const { field, value } = useStringFieldValue("RadioGroupField");
  const error = useFieldError();
  const accessibility = getFieldAccessibility(
    { accessibilityHint, accessibilityLabel, description, label },
    error,
  );

  function handleValueChange(nextValue: string) {
    field.handleChange(nextValue);
    field.handleBlur();
  }

  return (
    <FormField description={description} label={label}>
      <RadioGroup
        {...radioGroupProps}
        {...accessibility}
        invalid={error !== undefined}
        onValueChange={handleValueChange}
        value={value}
      />
    </FormField>
  );
}
