import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";

export default function ContainerRoute() {
  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">Container</P>
        <P variant="muted">
          Containers lay out their children with named variants instead of class
          names.
        </P>
      </Container>

      <Container variant="section">
        <P variant="muted">Row</P>
        <Container variant="row">
          <P>First</P>
          <P>Second</P>
          <P>Third</P>
        </Container>
      </Container>

      <Container accessibilityLabel="Example card" variant="card">
        <P variant="lead">Card</P>
        <P variant="muted">
          The card variant uses the active theme colors and can be reused
          throughout the app.
        </P>
      </Container>
    </Container>
  );
}
