import { Button } from "@invid/ui/button";
import type { Meta, StoryObj } from "@storybook/react-native";

const BUTTON_VARIANTS = ["default", "lead", "muted"] as const;

const meta = {
  title: "Form/Button",
  component: Button,
  args: {
    title: "Continue",
    variant: "default",
  },
  argTypes: {
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
export const Muted : Story = {
  args : { variant : "muted" },
};
