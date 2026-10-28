import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { TimePicker } from "../../../../packages/ui/dist/ui/date-time-picker/time-picker";

const meta = {
  title: "Form/TimePicker",
  component: TimePicker,
  args: {
    value: null,
    onChange: () => {},
    placeholder: "Select a time",
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: null, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return <TimePicker {...args} onChange={setValue} value={value} />;
  },
};