import { useAppForm } from "@invid/ui/form-fields";
import type { Meta, StoryObj } from "@storybook/react-native";

const NAME_REQUIRED = "Name is required.";

function validateName({ value }: { value: string }) {
  return value.trim() ? undefined : NAME_REQUIRED;
}

function ExampleForm() {
  const form = useAppForm({
    defaultValues: { name: "", quantity: "" },
  });

  return (
    <>
      <form.AppField name="name" validators={{ onChange: validateName }}>
        {(field) => <field.TextField label="Name" placeholder="Enter a name" />}
      </form.AppField>
      <form.AppField name="quantity">
        {(field) => (
          <field.NumberField label="Quantity" placeholder="Enter a quantity" />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton variant="primary" />
      </form.AppForm>
    </>
  );
}

const meta = {
  title: "Form/FormFields",
  component: ExampleForm,
} satisfies Meta<typeof ExampleForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NameAndQuantity: Story = {};
