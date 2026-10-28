import { Container } from "@invid/ui/container";
import { NumberInput } from "@invid/ui/number-input";
import { P } from "@invid/ui/p";
import { useState } from "react";

export default function NumberInputRoute() {
  const [value, setValue] = useState("");

  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">NumberInput tester</P>
        <P variant="muted">
          Enter a whole or decimal number. A leading minus sign is allowed.
        </P>
      </Container>

      <Container variant="section">
        <P variant="muted">Your number</P>
        <Container variant="card">
          <NumberInput
            accessibilityLabel="Enter a number"
            onChangeText={setValue}
            placeholder="Enter a number..."
            value={value}
          />
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Result</P>
        <P>{value || "No number entered yet"}</P>
      </Container>
    </Container>
  );
}
