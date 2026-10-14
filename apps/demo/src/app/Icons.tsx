import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router/stack";

export default function IconsRoute() {
  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "Icons" }} />

      <Container variant="section">
        <P variant="lead">Icons</P>
        <P variant="muted">
          Lucide icons can be styled with the UI icon component and theme
          variants.
        </P>
      </Container>

      <Container variant="section">
        <P variant="muted">Primary</P>
        <Container variant="card">
          <Container variant="row">
            <Icon name="home" />
            <Icon name="heart" size={24} />
            <Icon name="settings" />
            <Icon name="star" size={16} />
            <Icon name="bell" />
            <Icon name="calendar" />
            <Icon name="mail" />
            <Icon name="mapPin" />
            <Icon name="search" />
            <Icon name="user" />
            <Icon name="hash"/>
          </Container>
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Secondary</P>
        <Container variant="card">
          <Container variant="row">
            <Icon name="home" variant="secondary" />
            <Icon name="heart" variant="secondary" size={24} />
            <Icon name="settings" variant="secondary" />
            <Icon name="star" variant="secondary" size={16} />
            <Icon name="bell" variant="secondary" />
            <Icon name="calendar" variant="secondary" />
            <Icon name="mail" variant="secondary" />
            <Icon name="mapPin" variant="secondary" />
            <Icon name="search" variant="secondary" />
            <Icon name="user" variant="secondary" />
            <Icon name="hash" variant="secondary" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
