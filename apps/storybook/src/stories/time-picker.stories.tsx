import type { TimePickerProps } from "@invid/ui/time-picker";
import { TimePicker } from "@invid/ui/time-picker";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { fn } from "storybook/test";

function ControlledTimePicker(props: TimePickerProps) {
  const [value, setValue] = useState<Date | null>(props.value);

  function handleChange(nextValue: Date) {
    setValue(nextValue);
    props.onChange(nextValue);
  }

  return <TimePicker {...props} onChange={handleChange} value={value} />;
}

const meta = {
  title: "Form/TimePicker",
  component: TimePicker,
  args: {
    onChange: fn(),
    placeholder: "Select a time",
    value: null,
  },
  argTypes: {
    onChange: { control: false },
  },
  render: (args) => <ControlledTimePicker {...args} />,
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwentyFourHour: Story = {
  args: { is24Hour: true },
};

export const FifteenMinuteSteps: Story = {
  args: { minuteInterval: 15 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
