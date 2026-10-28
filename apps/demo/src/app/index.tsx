import { Button } from "@invid/ui/button";
import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { COMPONENT_SCREENS } from "@/demo-screens";

const LINK_ICON_SIZE = 16;

export default function OverviewRoute() {
  const componentLinks = COMPONENT_SCREENS.map(({ icon, name, title }) => (
    <Link asChild={true} href={`/${name}`} key={name}>
      <Button icon={<Icon name={icon} size={LINK_ICON_SIZE} />} title={title} />
    </Link>
  ));

  return (
    <ScrollView>
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">INVID UI</P>
          <P variant="muted">
            Open the menu, or pick a component below, to browse its demo screen.
          </P>
        </Container>
        <Container variant="section">{componentLinks}</Container>
      </Container>
    </ScrollView>
  );
}
