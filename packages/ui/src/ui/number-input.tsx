import { useState } from "react";
import type { TextInputProps, TextInputVariant } from "#/ui/text-input";
import { TextInput } from "#/ui/text-input";

export type NumberInputVariant = TextInputVariant;

type NumberInputValueProps =
  | { value: string; defaultValue?: never }
  | { value?: never; defaultValue?: string };

export type NumberInputProps = Omit<
  TextInputProps,
  "defaultValue" | "keyboardType" | "multiline" | "onChangeText" | "value"
> &
  NumberInputValueProps & {
    onChangeText?: (value: string) => void;
  };

function normalizeNumberText(value: string): string {
  const sign = value.startsWith("-") ? "-" : "";
  const numericText = value.replace(/[^\d.]/g, "");
  const [integerPart = "", ...fractionParts] = numericText.split(".");
  const fraction = fractionParts.length > 0 ? `.${fractionParts.join("")}` : "";

  return `${sign}${integerPart}${fraction}`;
}

export function NumberInput({
  value,
  defaultValue,
  onChangeText,
  ...textInputProps
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(() =>
    normalizeNumberText(defaultValue ?? ""),
  );
  const isControlled = value !== undefined;
  const displayedValue = isControlled
    ? normalizeNumberText(value)
    : internalValue;

  function handleChangeText(text: string) {
    const normalizedText = normalizeNumberText(text);
    if (!isControlled) {
      setInternalValue(normalizedText);
    }
    onChangeText?.(normalizedText);
  }

  return (
    <TextInput
      {...textInputProps}
      keyboardType="decimal-pad"
      multiline={false}
      onChangeText={handleChangeText}
      value={displayedValue}
    />
  );
}
