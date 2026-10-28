import type { DatePickerProps } from "@invid/ui/date-picker";
import { DatePicker } from "@invid/ui/date-picker";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { fn } from "storybook/test";

function ControlledDatePicker(props: DatePickerProps) {
  const [value, setValue] = useState<Date | null>(props.value);

  function handleChange(nextValue: Date) {
    setValue(nextValue);
    props.onChange(nextValue);
  }

  return <DatePicker {...props} onChange={handleChange} value={value} />;
}

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  args: {
    onChange: fn(),
    placeholder: "Select a date",
    value: null,
  },
  argTypes: {
    onChange: { control: false },
  },
  render: (args) => <ControlledDatePicker {...args} />,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
