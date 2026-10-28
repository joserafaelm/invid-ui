import type { TitleVariant } from "@invid/ui/title";
import { Title } from "@invid/ui/title";
import type { Meta, StoryObj } from "@storybook/react-native";

const TITLE_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly TitleVariant[];

const meta = {
  title: "Typography/Title",
  component: Title,
  args: {
    children: "A title for your screen",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: TITLE_VARIANTS,
    },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};
