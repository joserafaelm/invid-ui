import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import type { RadioGroupOption } from "@invid/ui/radio-group";
import { RadioGroup } from "@invid/ui/radio-group";
import { useState } from "react";
import { ScrollView } from "react-native";

const PLANS = [
  { label: "Basic", value: "basic" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise (contact sales)", value: "enterprise", disabled: true },
] as const satisfies readonly RadioGroupOption[];

export default function RadioGroupRoute() {
  const [plan, setPlan] = useState<string>();
  const planLabel = plan ?? "No plan selected yet";

  return (
    <ScrollView>
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">RadioGroup tester</P>
          <P variant="muted">Pick exactly one option.</P>
        </Container>

        <Container variant="section">
          <P variant="label">Plan</P>
          <RadioGroup
            accessibilityLabel="Plan"
            onValueChange={setPlan}
            options={PLANS}
            value={plan}
          />
          <P variant="muted">{planLabel}</P>
        </Container>

        <Container variant="section">
          <P variant="label">Invalid</P>
          <RadioGroup
            accessibilityLabel="Invalid plan"
            invalid={true}
            onValueChange={setPlan}
            options={PLANS}
            value={undefined}
          />
          <P variant="danger">Choose a plan.</P>
        </Container>

        <Container variant="section">
          <P variant="label">Disabled</P>
          <RadioGroup
            accessibilityLabel="Disabled plan"
            disabled={true}
            onValueChange={setPlan}
            options={PLANS}
            value="pro"
          />
        </Container>
      </Container>
    </ScrollView>
  );
}
