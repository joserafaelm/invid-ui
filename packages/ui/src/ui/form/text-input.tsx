import type { ComponentPropsWithRef } from "react";
import { TextInput as NativeTextInput } from "react-native";
import type { TextInputVariant } from "#/ui/form/text-input.styles";
import { textInputVariants } from "#/ui/form/text-input.styles";

export type { TextInputVariant } from "#/ui/form/text-input.styles";

type NativeTextInputProps = ComponentPropsWithRef<typeof NativeTextInput>;

export type TextInputProps = Omit<
  NativeTextInputProps,
  "children" | "className"
> & {
  variant?: TextInputVariant;
  /**
   * Draws the input in the danger color. Pair it with a visible error message;
   * color alone does not explain what is wrong.
   */
  invalid?: boolean;
};

export function TextInput({
  variant,
  invalid,
  ...textInputProps
}: TextInputProps) {
  const className = textInputVariants({ variant, invalid: invalid === true });
  const uniwindTextInputProps = { ...textInputProps, className };

  return <NativeTextInput {...uniwindTextInputProps} />;
}
