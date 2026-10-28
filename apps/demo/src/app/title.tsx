import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { Title } from "@invid/ui/title";

export default function TitleRoute() {
  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">Variants</P>
        <Title variant="lead">Lead title</Title>
        <Title>Default title</Title>
        <Title variant="muted">Muted title</Title>
      </Container>

      <Container variant="section">
        <P variant="lead">Native props</P>
        <Title numberOfLines={2} selectable={true}>
          This title supports native Text props and semantic variants, and
          screen readers announce it as a heading.
        </Title>
      </Container>
    </Container>
  );
}
