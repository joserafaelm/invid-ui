import { useTextControl } from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField } from "#/ui/form/form-field";
import type { TextAreaProps } from "#/ui/form/text-area";
import { TextArea } from "#/ui/form/text-area";

type FieldOwnedProps =
  | "defaultValue"
  | "invalid"
  | "onBlur"
  | "onChangeText"
  | "value";

export type TextAreaFieldProps = Omit<FormFieldProps, "children"> &
  Omit<TextAreaProps, FieldOwnedProps>;

export function TextAreaField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...textAreaProps
}: TextAreaFieldProps) {
  const control = useTextControl("TextAreaField", {
    accessibilityHint,
    accessibilityLabel,
    description,
    label,
  });

  return (
    <FormField description={description} label={label}>
      <TextArea {...textAreaProps} {...control} />
    </FormField>
  );
}
