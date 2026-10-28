import { TextInput as NativeTextInput } from "react-native";
import type { TextInputProps, TextInputVariant } from "#/ui/form/text-input";
import { textInputVariants } from "#/ui/form/text-input.styles";

export type TextAreaVariant = TextInputVariant;

export type TextAreaProps = Omit<
  TextInputProps,
  "multiline" | "textAlignVertical"
>;

export function TextArea({
  variant,
  invalid,
  ...textAreaProps
}: TextAreaProps) {
  const className = textInputVariants({
    variant,
    invalid: invalid === true,
    multiline: true,
  });
  const uniwindTextAreaProps = {
    ...textAreaProps,
    className,
    multiline: true,
    textAlignVertical: "top" as const,
  };

  return <NativeTextInput {...uniwindTextAreaProps} />;
}
