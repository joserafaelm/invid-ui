import { Card } from "@invid/ui/card";
import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router/stack";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const CARD_DESCRIPTION =
  "A reusable container that groups related content. Works equally well in a responsive grid on web and as a stacked list item on mobile.";
const CARD_IMAGE_URL = "https://picsum.photos/seed/uikit/640/360";

export default function CardRoute() {
  const [pressCount, setPressCount] = useState(0);

  return (
    <ScrollView>
      <Container variant="screen">
      <Stack.Screen options={{ title: "Card" }} />
      <Container variant="section">
        <P variant="lead">Card</P>
        <P variant="muted">{CARD_DESCRIPTION}</P>
      </Container>
      <Card eyebrow="Feature" subtitle={CARD_DESCRIPTION} title="Card" />
      <Card
        elevated={true}
        eyebrow="Feature"
        imageUrl={CARD_IMAGE_URL}
        subtitle={CARD_DESCRIPTION}
        title="Image Card"
      />
      <Card
        elevated={true}
        eyebrow="Interactive"
        onPress={() => setPressCount((count) => count + 1)}
        subtitle={`Lifts on hover — great for clickable tiles. Pressed ${pressCount} times.`}
        title="Interactive Card"
      />
      </Container>
    </ScrollView>
  );
}
