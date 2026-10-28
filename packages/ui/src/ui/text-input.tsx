import type { ComponentPropsWithRef } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { tv } from "tailwind-variants";

export type TextInputVariant = "default" | "lead" | "muted";

type NativeTextInputProps = ComponentPropsWithRef<typeof NativeTextInput>;

export type TextInputProps = Omit<
  NativeTextInputProps,
  "children" | "className"
> & {
  variant?: TextInputVariant;
};

const TEXT_INPUT_VARIANT_STYLES = {
  default: "border-muted-foreground/20 text-base leading-6 text-foreground",
  lead: "border-primary text-lg leading-7 text-foreground",
  muted: "border-muted-foreground/20 text-base leading-6 text-muted-foreground",
} as const satisfies Record<TextInputVariant, string>;

const textInputVariants = tv({
  base: "rounded-xl border bg-background px-4 py-3",
  variants: {
    variant: TEXT_INPUT_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

export function TextInput({ variant, ...textInputProps }: TextInputProps) {
  const className = textInputVariants({ variant });
  const uniwindTextInputProps = { ...textInputProps, className };

  return <NativeTextInput {...uniwindTextInputProps} />;
}
