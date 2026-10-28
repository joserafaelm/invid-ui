import { FormField, useFieldContext } from "@invid/ui/form-field";
import { extendForm } from "@invid/ui/form-fields";
import { RadioGroup } from "@invid/ui/radio-group";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useEffect } from "react";

type RatingFieldProps = {
  label: string;
  description?: string | undefined;
};

type RatingFormProps = {
  description: string | undefined;
  submitOnMount: boolean;
};

const RATING_OPTIONS = [
  { label: "1 - Poor", value: "1" },
  { label: "2 - Fair", value: "2" },
  { label: "3 - Good", value: "3" },
  { label: "4 - Great", value: "4" },
  { label: "5 - Excellent", value: "5" },
];

const EMPTY_RATING = { rating: 0 };

function RatingField({ label, description }: RatingFieldProps) {
  const field = useFieldContext<number>();
  const selectedValue =
    field.state.value > 0 ? String(field.state.value) : undefined;

  function handleValueChange(nextValue: string) {
    field.handleChange(Number(nextValue));
    field.handleBlur();
  }

  return (
    <FormField description={description} label={label}>
      <RadioGroup
        accessibilityLabel={label}
        onValueChange={handleValueChange}
        options={RATING_OPTIONS}
        value={selectedValue}
      />
    </FormField>
  );
}

const ratingForm = extendForm({ fieldComponents: { RatingField } });

function requireRating({ value }: { value: number }) {
  return value > 0 ? undefined : "Choose a rating.";
}

function RatingForm({ description, submitOnMount }: RatingFormProps) {
  const form = ratingForm.useAppForm({ defaultValues: EMPTY_RATING });

  useEffect(() => {
    if (submitOnMount) {
      void form.handleSubmit();
    }
  }, [form, submitOnMount]);

  return (
    <form.AppForm>
      <form.AppField name="rating" validators={{ onChange: requireRating }}>
        {(field) => (
          <field.RatingField description={description} label="Your rating" />
        )}
      </form.AppField>
      <form.SubmitButton title="Send" variant="primary" />
    </form.AppForm>
  );
}

const meta = {
  title: "Form/FormField",
  component: RatingForm,
  args: {
    description: undefined,
    submitOnMount: false,
  },
} satisfies Meta<typeof RatingForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: "How was your visit today?" },
};

export const WithError: Story = {
  args: {
    description: "How was your visit today?",
    submitOnMount: true,
  },
};
