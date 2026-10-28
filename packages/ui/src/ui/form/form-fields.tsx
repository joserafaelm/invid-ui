import { createFormHook } from "@tanstack/react-form";
import { formHookContexts } from "#/internal/form-context";
import { NumberField } from "#/ui/form/fields/number-field";
import { PhoneField } from "#/ui/form/fields/phone-field";
import { RadioGroupField } from "#/ui/form/fields/radio-group-field";
import { SelectField } from "#/ui/form/fields/select-field";
import { SubmitButton } from "#/ui/form/fields/submit-button";
import { TextAreaField } from "#/ui/form/fields/text-area-field";
import { TextField } from "#/ui/form/fields/text-field";

const { fieldContext, formContext } = formHookContexts;

export const { useAppForm, withForm, withFieldGroup, extendForm } =
  createFormHook({
    fieldComponents: {
      TextField,
      TextAreaField,
      NumberField,
      PhoneField,
      SelectField,
      RadioGroupField,
    },
    formComponents: {
      SubmitButton,
    },
    fieldContext,
    formContext,
  });
