import { Container } from "@invid/ui/container";
import type { IconName, IconVariant } from "@invid/ui/icons";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";

const DEMO_ICONS = [
  { name: "home" },
  { name: "heart", size: 24 },
  { name: "settings" },
  { name: "star", size: 16 },
  { name: "bell" },
  { name: "calendar" },
  { name: "mail" },
  { name: "mapPin" },
  { name: "search" },
  { name: "user" },
  { name: "hash" },
] as const satisfies readonly { name: IconName; size?: number }[];

const DEMO_VARIANTS = [
  { label: "Primary", variant: "primary" },
  { label: "Secondary", variant: "secondary" },
  { label: "Muted", variant: "muted" },
] as const satisfies readonly { label: string; variant: IconVariant }[];

export default function IconsRoute() {
  const variantSections = DEMO_VARIANTS.map(({ label, variant }) => {
    const icons = DEMO_ICONS.map((icon) => (
      <Icon key={icon.name} {...icon} variant={variant} />
    ));

    return (
      <Container key={variant} variant="section">
        <P variant="muted">{label}</P>
        <Container variant="card">
          <Container variant="row">{icons}</Container>
        </Container>
      </Container>
    );
  });

  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">Icons</P>
        <P variant="muted">
          Lucide icons can be styled with the UI icon component and theme
          variants.
        </P>
      </Container>
      {variantSections}
    </Container>
  );
}
