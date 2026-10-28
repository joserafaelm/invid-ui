import type { ButtonVariant } from "@invid/ui/button";
import { Button } from "@invid/ui/button";
import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { useState } from "react";

const BUTTON_EXAMPLES = [
  { label: "Default", variant: "default" },
  { label: "Primary", variant: "primary" },
  { label: "Secondary", variant: "secondary" },
  { label: "Muted", variant: "muted" },
] as const satisfies readonly { label: string; variant: ButtonVariant }[];

const NO_PRESS_YET = "None yet";

export default function ButtonRoute() {
  const [pressCount, setPressCount] = useState(0);
  const [lastPressed, setLastPressed] = useState<string>(NO_PRESS_YET);

  function handlePress(label: string) {
    setLastPressed(label);
    setPressCount((count) => count + 1);
  }

  const variantButtons = BUTTON_EXAMPLES.map(({ label, variant }) => {
    function handleVariantPress() {
      handlePress(label);
    }

    return (
      <Button
        key={variant}
        onPress={handleVariantPress}
        title={`${label} button`}
        variant={variant}
      />
    );
  });

  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">Button tester</P>
        <P variant="muted">Try each public variant and interaction state.</P>
      </Container>

      <Container variant="section">
        <P variant="muted">Variants</P>
        {variantButtons}
      </Container>

      <Container variant="section">
        <P variant="muted">Disabled</P>
        <Button disabled={true} title="Disabled button" />
      </Container>

      <Container variant="section">
        <P variant="muted">Last pressed: {lastPressed}</P>
        <P variant="muted">Total presses: {pressCount}</P>
      </Container>
    </Container>
  );
}
