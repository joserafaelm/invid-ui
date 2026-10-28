import { useAppForm } from "@invid/ui/form-fields";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useEffect } from "react";
import { fn } from "storybook/test";

type ExampleValues = {
  name: string;
  phone: string;
  guests: number | undefined;
  country: string | undefined;
  seating: string | undefined;
  notes: string;
};

type ExampleFormProps = {
  initialValues: ExampleValues;
  submitOnMount: boolean;
  onSubmit: (values: ExampleValues) => void;
};

const MAX_GUESTS = 20;

const EMPTY_VALUES: ExampleValues = {
  name: "",
  phone: "",
  guests: undefined,
  country: undefined,
  seating: undefined,
  notes: "",
};

const FILLED_VALUES: ExampleValues = {
  name: "Ana García",
  phone: "+34 600 123 456",
  guests: 4,
  country: "es",
  seating: "terrace",
  notes: "One guest uses a wheelchair.",
};

const COUNTRIES = [
  { label: "Colombia", value: "co" },
  { label: "Mexico", value: "mx" },
  { label: "Spain", value: "es" },
];

const SEATING = [
  { label: "Indoor", value: "indoor" },
  { label: "Terrace", value: "terrace" },
];

function requireText({ value }: { value: string }) {
  return value.trim() ? undefined : "This field is required.";
}

function requireChoice({ value }: { value: string | undefined }) {
  return value === undefined ? "Choose an option." : undefined;
}

function validateGuests({ value }: { value: number | undefined }) {
  if (value === undefined) {
    return "Enter the number of guests.";
  }
  return Number.isInteger(value) && value >= 1 && value <= MAX_GUESTS
    ? undefined
    : `Enter a whole number from 1 to ${MAX_GUESTS}.`;
}

function ExampleForm({
  initialValues,
  submitOnMount,
  onSubmit,
}: ExampleFormProps) {
  const form = useAppForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => onSubmit(value),
  });

  useEffect(() => {
    if (submitOnMount) {
      void form.handleSubmit();
    }
  }, [form, submitOnMount]);

  return (
    <form.AppForm>
      <form.AppField name="name" validators={{ onChange: requireText }}>
        {(field) => <field.TextField label="Name" placeholder="Full name" />}
      </form.AppField>
      <form.AppField name="phone" validators={{ onChange: requireText }}>
        {(field) => (
          <field.PhoneField
            description="We text you when the table is ready."
            label="Phone"
          />
        )}
      </form.AppField>
      <form.AppField name="guests" validators={{ onChange: validateGuests }}>
        {(field) => <field.NumberField label="Guests" />}
      </form.AppField>
      <form.AppField name="country" validators={{ onChange: requireChoice }}>
        {(field) => (
          <field.SelectField
            label="Country"
            options={COUNTRIES}
            placeholder="Choose a country"
          />
        )}
      </form.AppField>
      <form.AppField name="seating" validators={{ onChange: requireChoice }}>
        {(field) => <field.RadioGroupField label="Seating" options={SEATING} />}
      </form.AppField>
      <form.AppField name="notes">
        {(field) => (
          <field.TextAreaField description="Optional" label="Notes" />
        )}
      </form.AppField>
      <form.SubmitButton title="Reserve" variant="primary" />
    </form.AppForm>
  );
}

const meta = {
  title: "Form/FormFields",
  component: ExampleForm,
  args: {
    initialValues: EMPTY_VALUES,
    onSubmit: fn(),
    submitOnMount: false,
  },
  argTypes: {
    initialValues: { control: false },
    onSubmit: { control: false },
  },
} satisfies Meta<typeof ExampleForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { initialValues: FILLED_VALUES },
};

export const SubmittedWithErrors: Story = {
  args: { submitOnMount: true },
};
