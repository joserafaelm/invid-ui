import { useThemeColor, type ThemeColor } from "#/theme/use-theme-color";
import {
  createFormHook,
  createFormHookContexts,
  type AnyFieldApi,
} from "@tanstack/react-form";
import type { ReactNode } from "react";
import { Text } from "react-native";
import { Button, type ButtonProps } from "./button";
import { Container, type ContainerVariant } from "./container";
import { NumberInput, type NumberInputProps } from "./number-input";
import { P, type PVariant } from "./p";
import { TextInput, type TextInputProps } from "./text-input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

type FormFieldProps = {
  label: string;
  containerVariant?: ContainerVariant;
  labelVariant?: PVariant;
  errorColor?: ThemeColor;
};

export type FormTextInputProps = FormFieldProps &
  Omit<TextInputProps, "value" | "defaultValue" | "onChangeText" | "onBlur">;

export type FormNumberInputProps = FormFieldProps &
  Omit<NumberInputProps, "value" | "defaultValue" | "onChangeText" | "onBlur">;

export type FormSubmitButtonProps = Omit<ButtonProps, "onPress" | "title"> & {
  title?: string;
};

function getErrorMessage(field: AnyFieldApi): string | undefined {
  if (!field.state.meta.isTouched) {
    return undefined;
  }

  const error = field.state.meta.errors[0];
  if (typeof error === "string") {
    return error;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
}

function FormFieldFrame({
  children,
  containerVariant = "section",
  error,
  errorColor: errorColorName = "primary",
  label,
  labelVariant = "muted",
}: {
  children: ReactNode;
  containerVariant?: ContainerVariant | undefined;
  error: string | undefined;
  errorColor?: ThemeColor | undefined;
  label: string;
  labelVariant?: PVariant | undefined;
}) {
  const errorColor = useThemeColor(errorColorName);

  return (
    <Container variant={containerVariant}>
      <P variant={labelVariant}>{label}</P>
      {children}
      {error ? (
        <Text accessibilityRole="alert" style={{ color: errorColor }}>
          {error}
        </Text>
      ) : null}
    </Container>
  );
}

export function FormTextInput({
  containerVariant,
  errorColor,
  label,
  labelVariant,
  ...textInputProps
}: FormTextInputProps) {
  const field = useFieldContext<string>();

  return (
    <FormFieldFrame
      containerVariant={containerVariant}
      error={getErrorMessage(field)}
      errorColor={errorColor}
      label={label}
      labelVariant={labelVariant}
    >
      <TextInput
        {...textInputProps}
        onBlur={field.handleBlur}
        onChangeText={field.handleChange}
        value={String(field.state.value ?? "")}
      />
    </FormFieldFrame>
  );
}

export function FormNumberInput({
  containerVariant,
  errorColor,
  label,
  labelVariant,
  ...numberInputProps
}: FormNumberInputProps) {
  const field = useFieldContext<string>();

  return (
    <FormFieldFrame
      containerVariant={containerVariant}
      error={getErrorMessage(field)}
      errorColor={errorColor}
      label={label}
      labelVariant={labelVariant}
    >
      <NumberInput
        {...numberInputProps}
        onBlur={field.handleBlur}
        onChangeText={field.handleChange}
        value={String(field.state.value ?? "")}
      />
    </FormFieldFrame>
  );
}

export function FormSubmitButton({
  title = "Submit",
  ...buttonProps
}: FormSubmitButtonProps) {
  const form = useFormContext();

  return (
    <Button
      {...buttonProps}
      onPress={() => void form.handleSubmit()}
      title={title}
    />
  );
}

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormTextInput,
    NumberField: FormNumberInput,
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
  fieldContext,
  formContext,
});
