import type { SelectOption, SelectProps } from "@invid/ui/select";
import { Select } from "@invid/ui/select";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { fn } from "storybook/test";

const SIZES = [
  { label: "Small", value: "s" },
  { label: "Medium", value: "m" },
  { label: "Large (sold out)", value: "l", disabled: true },
] as const satisfies readonly SelectOption[];

const COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "Spain",
  "United States",
  "Uruguay",
  "Venezuela",
].map((name) => ({ label: name, value: name.toLowerCase() }));

const LONG_LABEL_OPTIONS = [
  {
    label:
      "Deliver to the reception desk on the ground floor of the north building",
    value: "reception",
  },
  { label: "Leave at the door", value: "door" },
] as const satisfies readonly SelectOption[];

function ControlledSelect(props: SelectProps) {
  const [value, setValue] = useState(props.value);

  function handleValueChange(nextValue: string) {
    setValue(nextValue);
    props.onValueChange(nextValue);
  }

  return <Select {...props} onValueChange={handleValueChange} value={value} />;
}

const meta = {
  title: "Form/Select",
  component: Select,
  args: {
    accessibilityLabel: "Size",
    onOpenChange: fn(),
    onValueChange: fn(),
    options: SIZES,
    placeholder: "Choose a size",
    value: undefined,
  },
  argTypes: {
    onOpenChange: { control: false },
    onValueChange: { control: false },
    options: { control: false },
  },
  render: (args) => <ControlledSelect {...args} />,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { value: "m" },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: "m" },
};

export const LongList: Story = {
  args: {
    accessibilityLabel: "Country",
    options: COUNTRIES,
    placeholder: "Choose a country",
  },
};

export const LongLabels: Story = {
  args: {
    accessibilityLabel: "Delivery",
    options: LONG_LABEL_OPTIONS,
    value: "reception",
  },
};
