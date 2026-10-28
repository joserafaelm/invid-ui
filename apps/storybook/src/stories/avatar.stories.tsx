import type { AvatarSize } from "@invid/ui/avatar";
import { Avatar } from "@invid/ui/avatar";
import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, View } from "react-native";

const AVATAR_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly AvatarSize[];

const styles = StyleSheet.create({
  sizes: { alignItems: "center", flexDirection: "row", gap: 12 },
});

const meta = {
  title: "Display/Avatar",
  component: Avatar,
  args: {
    name: "Yariel Santiago",
    size: "md",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: AVATAR_SIZES,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const IconFallback: Story = {
  args: { name: "" },
};

export const Sizes: Story = {
  render: (args) => (
    <View style={styles.sizes}>
      {AVATAR_SIZES.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </View>
  ),
};
