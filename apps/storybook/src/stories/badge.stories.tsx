import type { BadgeSize, BadgeVariant } from "@invid/ui/badge";
import { Badge } from "@invid/ui/badge";
import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

const BADGE_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "muted",
  "success",
  "warning",
  "danger",
  "info",
] as const satisfies readonly BadgeVariant[];

const BADGE_SIZES = ["sm", "md"] as const satisfies readonly BadgeSize[];

const meta = {
  title: "Display/Badge",
  component: Badge,
  args: {
    label: "Badge",
    variant: "default",
    size: "md",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: BADGE_VARIANTS,
    },
    size: {
      control: { type: "select" },
      options: BADGE_SIZES,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {BADGE_VARIANTS.map((variant) => (
        <Badge key={variant} {...args} label={variant} variant={variant} />
      ))}
    </View>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      {BADGE_SIZES.map((size) => (
        <Badge key={size} {...args} size={size} />
      ))}
    </View>
  ),
};
