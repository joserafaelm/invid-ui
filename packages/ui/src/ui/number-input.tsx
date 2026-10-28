import React from "react";
import { TextInput as NativeTextInput } from "react-native";
import { tv } from "tailwind-variants";

export type NumberInputVariant = "default" | "lead" | "muted";

type NativeTextInputProps = React.ComponentProps<typeof NativeTextInput>;

export type NumberInputProps = Omit<
  NativeTextInputProps,
  | "className"
  | "children"
  | "keyboardType"
  | "multiline"
  | "onChangeText"
  | "value"
  | "defaultValue"
> & {
  variant?: NumberInputVariant;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
};

const NUMBER_INPUT_VARIANT_STYLES = {
  default:
    "rounded-xl border border-muted-foreground/20 bg-background px-4 py-3 text-base leading-6 text-foreground",
  lead:
    "rounded-xl border border-primary bg-background px-4 py-3 text-lg leading-7 text-foreground",
  muted:
    "rounded-xl border border-muted-foreground/20 bg-background px-4 py-3 text-base leading-6 text-muted-foreground",
} as const satisfies Record<NumberInputVariant, string>;

const numberInputVariants = tv({
  variants: {
    variant: NUMBER_INPUT_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});



function normalizeNumberText(value: string): string {
  const sign = value.startsWith("-") ? "-" : "";
  const numericText = value.replace(/[^\d.]/g, "");
  const [integerPart = "", ...fractionParts] = numericText.split(".");
  const fraction = fractionParts.join("");

  return `${sign}${integerPart}${fractionParts.length > 0 ? `.${fraction}` : ""}`;
}

export function NumberInput({
  variant,
  value,
  defaultValue,
  onChangeText,
  style,
  ...textInputProps
}: NumberInputProps) {
  const [internalValue, setInternalValue] = React.useState(() =>
    normalizeNumberText(defaultValue ?? ""),
  );
  const normalizedValue =
    value === undefined ? undefined : normalizeNumberText(value);
  const unifiedTextInputProps = {
    ...textInputProps,
    className: numberInputVariants({ variant }),
    defaultValue: undefined,
    keyboardType: "decimal-pad" as const,
    multiline: false,
    onChangeText: (text: string) => {
      const normalizedText = normalizeNumberText(text);
      if (normalizedValue === undefined) {
        setInternalValue(normalizedText);
      }
      onChangeText?.(normalizedText);
    },
    style,
    value: normalizedValue ?? internalValue,
  };

  return <NativeTextInput {...unifiedTextInputProps} />;
}
