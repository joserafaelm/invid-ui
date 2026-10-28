import type { PhoneInputVariant } from "@invid/ui/phone-input";
import { PhoneInput } from "@invid/ui/phone-input";
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

const PHONE_INPUT_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly PhoneInputVariant[];

const meta = {
  title: "Form/PhoneInput",
  component: PhoneInput,
  args: {
    accessibilityLabel: "Phone",
    onChangeText: fn(),
    placeholder: "+34 600 123 456",
    variant: "default",
  },
  argTypes: {
    onChangeText: { control: false },
    variant: {
      control: { type: "select" },
      options: PHONE_INPUT_VARIANTS,
    },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "+34 600 123 456" },
};

export const Invalid: Story = {
  args: { defaultValue: "12", invalid: true },
};

export const Disabled: Story = {
  args: { defaultValue: "+34 600 123 456", editable: false },
};
