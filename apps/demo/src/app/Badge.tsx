import { Badge } from "@invid/ui/badge";
import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icon";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router/stack";

export default function BadgeRoute() {
  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "Badge" }} />

      <Container variant="section">
        <P variant="lead">Badge</P>
        <P variant="muted"> 
          Use badges to label statuses, categories, and short bits of supporting
          information.
        </P>
      </Container>

      <Container variant="section" >
        <P variant="muted">Variants</P>
        <Container variant="row" style={{ gap: 8, marginTop: 3, marginBottom: 3 }}>
          <Badge label="Default" />
          <Badge label="Primary" variant="primary" />
          <Badge label="Muted" variant="muted" />
        </Container>
        <Container variant="row" style ={{ gap: 8, marginTop: 3, marginBottom: 3 }}>
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Info" variant="info" />
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Sizes and icons</P>
        <Container variant="row" style={{ gap: 8, marginTop: 3, marginBottom: 3 }}>
          <Badge
            icon={<Icon name="checkCircle" size={14} />}
            label="Verified"
            size="sm"
            variant="success"
          />
          <Badge
            icon={<Icon name="bell" size={16} variant="primary" />}
            label="Notifications"
            size="md"
            variant="primary"
          />
        </Container>
      </Container>
    </Container>
  );
}
