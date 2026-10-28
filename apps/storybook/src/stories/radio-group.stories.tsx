import type { RadioGroupOption, RadioGroupProps } from "@invid/ui/radio-group";
import { RadioGroup } from "@invid/ui/radio-group";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { fn } from "storybook/test";

const PLANS = [
  { label: "Basic", value: "basic" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise (contact sales)", value: "enterprise", disabled: true },
] as const satisfies readonly RadioGroupOption[];

const LONG_LABEL_OPTIONS = [
  {
    label:
      "Email me a summary every morning with everything that changed the day before",
    value: "daily",
  },
  { label: "Only urgent updates", value: "urgent" },
] as const satisfies readonly RadioGroupOption[];

function ControlledRadioGroup(props: RadioGroupProps) {
  const [value, setValue] = useState(props.value);

  function handleValueChange(nextValue: string) {
    setValue(nextValue);
    props.onValueChange(nextValue);
  }

  return (
    <RadioGroup {...props} onValueChange={handleValueChange} value={value} />
  );
}

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  args: {
    accessibilityLabel: "Plan",
    onValueChange: fn(),
    options: PLANS,
    value: undefined,
  },
  argTypes: {
    onValueChange: { control: false },
    options: { control: false },
  },
  render: (args) => <ControlledRadioGroup {...args} />,
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { value: "pro" },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: "pro" },
};

export const LongLabels: Story = {
  args: {
    accessibilityLabel: "Notifications",
    options: LONG_LABEL_OPTIONS,
    value: "daily",
  },
};
