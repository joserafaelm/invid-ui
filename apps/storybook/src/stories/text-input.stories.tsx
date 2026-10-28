import type { TextInputVariant } from "@invid/ui/text-input";
import { TextInput } from "@invid/ui/text-input";
import type { Meta, StoryObj } from "@storybook/react-native";

const TEXT_INPUT_VARIANTS = [
  "default",
  "lead",
  "muted",
] as const satisfies readonly TextInputVariant[];

const meta = {
  title: "Form/TextInput",
  component: TextInput,
  args: {
    placeholder: "Type something",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: TEXT_INPUT_VARIANTS,
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lead: Story = {
  args: { variant: "lead" },
};

export const Muted: Story = {
  args: { variant: "muted" },
};
