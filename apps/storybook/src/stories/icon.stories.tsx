import type { IconVariant } from "@invid/ui/icons";
import { Icon } from "@invid/ui/icons";
import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
// @ts-expect-error
import IconBell from "@tabler/icons-react-native/IconBell";
// @ts-expect-error
import IconCalendar from "@tabler/icons-react-native/IconCalendar";
// @ts-expect-error
import IconHeart from "@tabler/icons-react-native/IconHeart";
// @ts-expect-error
import IconHome from "@tabler/icons-react-native/IconHome";
// @ts-expect-error
import IconMail from "@tabler/icons-react-native/IconMail";
// @ts-expect-error
import IconMapPin from "@tabler/icons-react-native/IconMapPin";
// @ts-expect-error
import IconSearch from "@tabler/icons-react-native/IconSearch";
// @ts-expect-error
import IconSettings from "@tabler/icons-react-native/IconSettings";
// @ts-expect-error
import IconStar from "@tabler/icons-react-native/IconStar";
// @ts-expect-error
import IconUser from "@tabler/icons-react-native/IconUser";

const ICON_VARIANTS = [
  "primary",
  "secondary",
  "muted",
] as const satisfies readonly IconVariant[];

const ICON_SIZES = [16, 20, 24] as const;
const ICON_STROKE_WIDTHS = [1.5, 2, 2.5] as const;
const GALLERY_ICONS = [
  IconBell,
  IconCalendar,
  IconHeart,
  IconHome,
  IconMail,
  IconMapPin,
  IconSearch,
  IconSettings,
  IconStar,
  IconUser,
];

const meta = {
  title: "Display/Icon",
  component: Icon,
  args: {
    icon: IconHome,
    variant: "primary",
    size: 20,
    strokeWidth: 2,
  },
  argTypes: {
    icon: { control: false },
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
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      {ICON_SIZES.map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </View>
  ),
};

export const Gallery: Story = {
  render: (args) => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 20,
      }}
    >
      {GALLERY_ICONS.map((icon, index) => (
        <Icon key={index} {...args} icon={icon} />
      ))}
    </View>
  ),
};
