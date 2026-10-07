import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";
// @ts-expect-error
import IconHeart from "@tabler/icons-react-native/IconHeart";
// @ts-expect-error
import IconHome from "@tabler/icons-react-native/IconHome";
// @ts-expect-error
import IconSettings from "@tabler/icons-react-native/IconSettings";
// @ts-expect-error
import IconStar from "@tabler/icons-react-native/IconStar";
import { Stack } from "expo-router/stack";

export default function IconsRoute() {
  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "Icons" }} />

      <Container variant="section">
        <P variant="lead">Icons</P>
        <P variant="muted">
          Tabler icons can be styled with the UI icon component and theme
          variants.
        </P>
      </Container>

      <Container variant="section">
        <P variant="muted">Primary</P>
        <Container variant="card">
          <Container variant="row">
            <Icon icon={IconHome} variant="primary" />
            <Icon icon={IconHeart} variant="primary" size="lg" />
            <Icon icon={IconSettings} variant="primary" />
            <Icon icon={IconStar} variant="primary" size="sm" />
          </Container>
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Secondary</P>
        <Container variant="card">
          <Container variant="row">
            <Icon icon={IconHome} variant="secondary" />
            <Icon icon={IconHeart} variant="secondary" size="lg" />
            <Icon icon={IconSettings} variant="secondary" />
            <Icon icon={IconStar} variant="secondary" size="sm" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
