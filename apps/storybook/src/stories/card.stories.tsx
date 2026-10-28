import { Card } from "@invid/ui/card";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";

const CARD_CONTENT = {
  eyebrow: "Feature",
  title: "Ship faster",
  subtitle: "Build UI in isolation",
};

const CARD_DESCRIPTION =
  "A reusable container that groups related content. Works equally well in a responsive grid on web and as a stacked list item on mobile.";

const meta = {
  title: "Display/Card",
  component: Card,
  args: {
    ...CARD_CONTENT,
    subtitle: CARD_DESCRIPTION,
    elevated: false,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithImage: Story = {
  args: {
    ...CARD_CONTENT,
    subtitle: CARD_DESCRIPTION,
    imageUrl: "https://picsum.photos/seed/uikit/640/360",
  },
};

export const Interactive: Story = {
  args: {
    eyebrow: "Interactive",
    title: "Interactive Card",
    subtitle: "Lifts on hover — great for clickable tiles.",
    elevated: true,
  },
  render: (args) => {
    const [pressCount, setPressCount] = useState(0);
    return (
      <Card
        {...args}
        onPress={() => setPressCount((count) => count + 1)}
        subtitle={`${args.subtitle} Pressed ${pressCount} times.`}
      />
    );
  },
};
