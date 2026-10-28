import type { AnyFieldApi } from "@tanstack/react-form";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import type { ReactNode } from "react";
import type { ThemeColor } from "#/theme/tokens";
import { useThemeColor } from "#/theme/use-theme-color";
import type { ButtonProps } from "#/ui/button";
import { Button } from "#/ui/button";
import type { ContainerVariant } from "#/ui/container";
import { Container } from "#/ui/container";
import type { NumberInputProps } from "#/ui/number-input";
import { NumberInput } from "#/ui/number-input";
import type { PVariant } from "#/ui/p";
import { P } from "#/ui/p";
import type { TextInputProps } from "#/ui/text-input";
import { TextInput } from "#/ui/text-input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const DEFAULT_SUBMIT_TITLE = "Submit";

type FormFieldProps = {
  label: string;
  containerVariant?: ContainerVariant;
  labelVariant?: PVariant;
  errorColor?: ThemeColor;
};

type FieldOwnedProps = "defaultValue" | "onBlur" | "onChangeText" | "value";

export type FormTextInputProps = FormFieldProps &
  Omit<TextInputProps, FieldOwnedProps>;

export type FormNumberInputProps = FormFieldProps &
  Omit<NumberInputProps, FieldOwnedProps>;

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
  field,
  frame: {
    containerVariant = "section",
    errorColor: errorColorName = "primary",
    label,
    labelVariant = "muted",
  },
}: {
  children: ReactNode;
  field: AnyFieldApi;
  frame: FormFieldProps;
}) {
  const errorColor = useThemeColor(errorColorName);
  const error = getErrorMessage(field);
  const errorStyle = { color: errorColor };

  return (
    <Container variant={containerVariant}>
      <P variant={labelVariant}>{label}</P>
      {children}
      {error ? (
        <P accessibilityRole="alert" style={errorStyle}>
          {error}
        </P>
      ) : null}
    </Container>
  );
}

export function FormTextInput(props: FormTextInputProps) {
  const {
    containerVariant,
    errorColor,
    label,
    labelVariant,
    ...textInputProps
  } = props;
  const field = useFieldContext<string>();

  return (
    <FormFieldFrame field={field} frame={props}>
      <TextInput
        {...textInputProps}
        accessibilityLabel={textInputProps.accessibilityLabel ?? label}
        onBlur={field.handleBlur}
        onChangeText={field.handleChange}
        value={String(field.state.value ?? "")}
      />
    </FormFieldFrame>
  );
}

export function FormNumberInput(props: FormNumberInputProps) {
  const {
    containerVariant,
    errorColor,
    label,
    labelVariant,
    ...numberInputProps
  } = props;
  const field = useFieldContext<string>();

  return (
    <FormFieldFrame field={field} frame={props}>
      <NumberInput
        {...numberInputProps}
        accessibilityLabel={numberInputProps.accessibilityLabel ?? label}
        onBlur={field.handleBlur}
        onChangeText={field.handleChange}
        value={String(field.state.value ?? "")}
      />
    </FormFieldFrame>
  );
}

export function FormSubmitButton({
  title = DEFAULT_SUBMIT_TITLE,
  ...buttonProps
}: FormSubmitButtonProps) {
  const form = useFormContext();

  function handleSubmit() {
    void form.handleSubmit();
  }

  return <Button {...buttonProps} onPress={handleSubmit} title={title} />;
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
