import type { ContainerVariant } from "@invid/ui/container";
import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import type { Meta, StoryObj } from "@storybook/react-native";

const CONTAINER_VARIANTS = [
  "default",
  "centered",
  "row",
  "screen",
  "section",
  "card",
] as const satisfies readonly ContainerVariant[];

const meta = {
  title: "Layout/Container",
  component: Container,
  args: {
    variant: "card",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: CONTAINER_VARIANTS,
    },
  },
  render: (args) => (
    <Container {...args}>
      <P variant="lead">Container</P>
      <P>First child</P>
      <P variant="muted">Second child</P>
    </Container>
  ),
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {};

export const Section: Story = {
  args: { variant: "section" },
};

export const Row: Story = {
  args: { variant: "row" },
};

export const Centered: Story = {
  args: { variant: "centered" },
};
