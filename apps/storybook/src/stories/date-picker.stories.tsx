import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { DatePicker } from "../../../../packages/ui/dist/ui/date-time-picker/date-picker";

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  args: {
    value: null,
    onChange: () => {},
    placeholder: "Select a date",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: null, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return <DatePicker {...args} onChange={setValue} value={value} />;
  },
};

export const Variants: Story = {
  args: { value: null, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <View style={{ gap: 12 }}>
        <DatePicker {...args} onChange={setValue} value={value} />
        <DatePicker
          {...args}
          onChange={setValue}
          value={value}
          variant="lead"
        />
        <DatePicker
          {...args}
          onChange={setValue}
          value={value}
          variant="muted"
        />
      </View>
    );
  },
};