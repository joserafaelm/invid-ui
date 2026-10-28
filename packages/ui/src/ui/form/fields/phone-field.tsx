import { useTextControl } from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField } from "#/ui/form/form-field";
import type { PhoneInputProps } from "#/ui/form/phone-input";
import { PhoneInput } from "#/ui/form/phone-input";

type FieldOwnedProps =
  | "defaultValue"
  | "invalid"
  | "onBlur"
  | "onChangeText"
  | "value";

export type PhoneFieldProps = Omit<FormFieldProps, "children"> &
  Omit<PhoneInputProps, FieldOwnedProps>;

export function PhoneField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...phoneInputProps
}: PhoneFieldProps) {
  const control = useTextControl("PhoneField", {
    accessibilityHint,
    accessibilityLabel,
    description,
    label,
  });

  return (
    <FormField description={description} label={label}>
      <PhoneInput {...phoneInputProps} {...control} />
    </FormField>
  );
}
