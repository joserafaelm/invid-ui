import type { ButtonVariant } from "@invid/ui/button";
import { Button } from "@invid/ui/button";
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

const BUTTON_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "muted",
] as const satisfies readonly ButtonVariant[];

const meta = {
  title: "Form/Button",
  component: Button,
  args: {
    onPress: fn(),
    title: "Continue",
    variant: "default",
  },
  argTypes: {
    onPress: { control: false },
    variant: {
      control: { type: "select" },
      options: BUTTON_VARIANTS,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LongTitle: Story = {
  args: { title: "Continue to delivery preferences and payment" },
};
