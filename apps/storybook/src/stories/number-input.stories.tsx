import type { NumberInputVariant } from "@invid/ui/number-input";
import { NumberInput } from "@invid/ui/number-input";
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

const NUMBER_INPUT_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly NumberInputVariant[];

const meta = {
  title: "Form/NumberInput",
  component: NumberInput,
  args: {
    accessibilityLabel: "Quantity",
    onChangeText: fn(),
    placeholder: "Enter a number",
    variant: "default",
  },
  argTypes: {
    onChangeText: { control: false },
    variant: {
      control: { type: "select" },
      options: NUMBER_INPUT_VARIANTS,
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: "-12.5" },
};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};
