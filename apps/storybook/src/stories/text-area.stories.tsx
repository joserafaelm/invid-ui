import type { TextAreaVariant } from "@invid/ui/text-area";
import { TextArea } from "@invid/ui/text-area";
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

const TEXT_AREA_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly TextAreaVariant[];

const LONG_TEXT =
  "A text area keeps growing as the text gets longer, so every line stays readable at the largest accessibility text sizes instead of scrolling inside a fixed box. This paragraph is long enough to wrap across several lines on a phone.";

const meta = {
  title: "Form/TextArea",
  component: TextArea,
  args: {
    accessibilityLabel: "Notes",
    onChangeText: fn(),
    placeholder: "Write a few lines",
    variant: "default",
  },
  argTypes: {
    onChangeText: { control: false },
    variant: {
      control: { type: "select" },
      options: TEXT_AREA_VARIANTS,
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongContent: Story = {
  args: { defaultValue: LONG_TEXT },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { defaultValue: LONG_TEXT, editable: false },
};

export const Lead: Story = {
  args: { variant: "lead" },
};
