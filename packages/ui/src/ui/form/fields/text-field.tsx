import { useTextControl } from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField } from "#/ui/form/form-field";
import type { TextInputProps } from "#/ui/form/text-input";
import { TextInput } from "#/ui/form/text-input";

type FieldOwnedProps =
  | "defaultValue"
  | "invalid"
  | "onBlur"
  | "onChangeText"
  | "value";

export type TextFieldProps = Omit<FormFieldProps, "children"> &
  Omit<TextInputProps, FieldOwnedProps>;

export function TextField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...textInputProps
}: TextFieldProps) {
  const control = useTextControl("TextField", {
    accessibilityHint,
    accessibilityLabel,
    description,
    label,
  });

  return (
    <FormField description={description} label={label}>
      <TextInput {...textInputProps} {...control} />
    </FormField>
  );
}
