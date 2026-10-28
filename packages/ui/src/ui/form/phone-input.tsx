import type { TextInputProps, TextInputVariant } from "#/ui/form/text-input";
import { TextInput } from "#/ui/form/text-input";

export type PhoneInputVariant = TextInputVariant;

export type PhoneInputProps = Omit<
  TextInputProps,
  "inputMode" | "keyboardType" | "multiline"
>;

export function PhoneInput(props: PhoneInputProps) {
  const phoneInputProps = {
    autoComplete: "tel" as const,
    textContentType: "telephoneNumber" as const,
    ...props,
    inputMode: "tel" as const,
    multiline: false,
  };

  return <TextInput {...phoneInputProps} />;
}
