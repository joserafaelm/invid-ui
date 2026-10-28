import {
  getFieldAccessibility,
  useStringFieldValue,
} from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField, useFieldError } from "#/ui/form/form-field";
import type { SelectProps } from "#/ui/form/select";
import { Select } from "#/ui/form/select";

type FieldOwnedProps =
  | "accessibilityLabel"
  | "invalid"
  | "onOpenChange"
  | "onValueChange"
  | "value";

export type SelectFieldProps = Omit<FormFieldProps, "children"> &
  Omit<SelectProps, FieldOwnedProps> &
  Partial<Pick<SelectProps, "accessibilityLabel">>;

export function SelectField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...selectProps
}: SelectFieldProps) {
  const { field, value } = useStringFieldValue("SelectField");
  const error = useFieldError();
  const accessibility = getFieldAccessibility(
    { accessibilityHint, accessibilityLabel, description, label },
    error,
  );

  function handleOpenChange(open: boolean) {
    if (!open) {
      field.handleBlur();
    }
  }

  return (
    <FormField description={description} label={label}>
      <Select
        {...selectProps}
        {...accessibility}
        invalid={error !== undefined}
        onOpenChange={handleOpenChange}
        onValueChange={field.handleChange}
        value={value}
      />
    </FormField>
  );
}
