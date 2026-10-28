import type { IconName, IconVariant } from "@invid/ui/icons";
import { Icon } from "@invid/ui/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, View } from "react-native";

const ICON_NAMES = [
  "bell",
  "box",
  "calendar",
  "clipboardList",
  "circle-chevron-right",
  "hash",
  "heart",
  "home",
  "mail",
  "mapPin",
  "pointer",
  "search",
  "settings",
  "shapes",
  "star",
  "type",
  "user",
] as const satisfies readonly IconName[];

const ICON_VARIANTS = [
  "primary",
  "secondary",
  "muted",
] as const satisfies readonly IconVariant[];

const ICON_SIZES = [16, 20, 24] as const;
const ICON_STROKE_WIDTHS = [1.5, 2, 2.5] as const;

const styles = StyleSheet.create({
  gallery: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  sizes: { alignItems: "center", flexDirection: "row", gap: 16 },
});

const meta = {
  title: "Display/Icon",
  component: Icon,
  args: {
    name: "home",
    variant: "primary",
    size: 20,
    strokeWidth: 2,
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: ICON_NAMES,
    },
    variant: {
      control: { type: "select" },
      options: ICON_VARIANTS,
    },
    size: {
      control: { type: "select" },
      options: ICON_SIZES,
    },
    strokeWidth: {
      control: { type: "select" },
      options: ICON_STROKE_WIDTHS,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const Sizes: Story = {
  render: (args) => (
    <View style={styles.sizes}>
      {ICON_SIZES.map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </View>
  ),
};

export const Gallery: Story = {
  render: (args) => (
    <View style={styles.gallery}>
      {ICON_NAMES.map((name) => (
        <Icon key={name} {...args} name={name} />
      ))}
    </View>
  ),
};
