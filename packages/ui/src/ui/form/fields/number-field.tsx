import { useState } from "react";
import {
  getFieldAccessibility,
  useNumberFieldValue,
} from "#/internal/form-field-control";
import type { FormFieldProps } from "#/ui/form/form-field";
import { FormField, useFieldError } from "#/ui/form/form-field";
import type { NumberInputProps } from "#/ui/form/number-input";
import { NumberInput } from "#/ui/form/number-input";

type FieldOwnedProps =
  | "defaultValue"
  | "invalid"
  | "onBlur"
  | "onChangeText"
  | "value";

export type NumberFieldProps = Omit<FormFieldProps, "children"> &
  Omit<NumberInputProps, FieldOwnedProps>;

function parseNumberText(text: string): number | undefined {
  if (text === "") {
    return undefined;
  }
  const number = Number(text);
  return Number.isFinite(number) ? number : undefined;
}

function formatNumber(value: number | undefined) {
  return value === undefined ? "" : String(value);
}

export function NumberField({
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
  ...numberInputProps
}: NumberFieldProps) {
  const { field, value } = useNumberFieldValue("NumberField");
  const error = useFieldError();
  const [draftText, setDraftText] = useState(() => formatNumber(value));
  const draftMatchesValue =
    field.state.meta.isDirty && parseNumberText(draftText) === value;
  const text = draftMatchesValue ? draftText : formatNumber(value);
  const accessibility = getFieldAccessibility(
    { accessibilityHint, accessibilityLabel, description, label },
    error,
  );

  function handleChangeText(nextText: string) {
    setDraftText(nextText);
    field.handleChange(parseNumberText(nextText));
  }

  return (
    <FormField description={description} label={label}>
      <NumberInput
        {...numberInputProps}
        {...accessibility}
        invalid={error !== undefined}
        onBlur={field.handleBlur}
        onChangeText={handleChangeText}
        value={text}
      />
    </FormField>
  );
}
