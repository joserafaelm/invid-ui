import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router";

export default function ContainerRoute() {
  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "Container" }} />

      <Container variant="section">
        <P variant="lead">Container</P>
        <P>
          Shows Variants
        </P>
      </Container>

      <Container accessibilityLabel="Example card" variant="section">
        <P variant="lead">Theme-aware card</P>
        <P variant="muted">
          The section uses the active theme colors and can be reused throughout
          the app.
        </P>
      </Container>
    </Container>
  );
}