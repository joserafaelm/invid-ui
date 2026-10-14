import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";
// @ts-expect-error
import IconBell from "@tabler/icons-react-native/IconBell";
// @ts-expect-error
import IconCalendar from "@tabler/icons-react-native/IconCalendar";
// @ts-expect-error
import IconHeart from "@tabler/icons-react-native/IconHeart";
// @ts-expect-error
import IconHome from "@tabler/icons-react-native/IconHome";
// @ts-expect-error
import IconMail from "@tabler/icons-react-native/IconMail";
// @ts-expect-error
import IconMapPin from "@tabler/icons-react-native/IconMapPin";
// @ts-expect-error
import IconSearch from "@tabler/icons-react-native/IconSearch";
// @ts-expect-error
import IconSettings from "@tabler/icons-react-native/IconSettings";
// @ts-expect-error
import IconStar from "@tabler/icons-react-native/IconStar";
// @ts-expect-error
import IconUser from "@tabler/icons-react-native/IconUser";
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
            <Icon icon={IconHeart} variant="primary" size={24} />
            <Icon icon={IconSettings} variant="primary" />
            <Icon icon={IconStar} variant="primary" size={16} />
            <Icon icon={IconBell} variant="primary" />
            <Icon icon={IconCalendar} variant="primary" />
            <Icon icon={IconMail} variant="primary" />
            <Icon icon={IconMapPin} variant="primary" />
            <Icon icon={IconSearch} variant="primary" />
            <Icon icon={IconUser} variant="primary" />
          </Container>
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Secondary</P>
        <Container variant="card">
          <Container variant="row">
            <Icon icon={IconHome} variant="secondary" />
            <Icon icon={IconHeart} variant="secondary" size={24} />
            <Icon icon={IconSettings} variant="secondary" />
            <Icon icon={IconStar} variant="secondary" size={16} />
            <Icon icon={IconBell} variant="secondary" />
            <Icon icon={IconCalendar} variant="secondary" />
            <Icon icon={IconMail} variant="secondary" />
            <Icon icon={IconMapPin} variant="secondary" />
            <Icon icon={IconSearch} variant="secondary" />
            <Icon icon={IconUser} variant="secondary" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
