import type { PVariant } from "@invid/ui/p";
import { P } from "@invid/ui/p";
import type { Meta, StoryObj } from "@storybook/react-native";

const P_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly PVariant[];

const DEFAULT_TEXT =
  "Default paragraph text uses the semantic foreground color and supports dynamic type.";

const LONG_TEXT =
  "P accepts native React Native Text props, including selection, truncation, accessibility, style, and ref. Styling is selected through semantic variants instead of Uniwind class names, so long copy truncates predictably when numberOfLines is set.";

const TRUNCATED_LINE_COUNT = 2;

const meta = {
  title: "Typography/P",
  component: P,
  args: {
    children: DEFAULT_TEXT,
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: P_VARIANTS,
    },
  },
} satisfies Meta<typeof P>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};

export const Truncated: Story = {
  args: {
    children: LONG_TEXT,
    numberOfLines: TRUNCATED_LINE_COUNT,
  },
};
