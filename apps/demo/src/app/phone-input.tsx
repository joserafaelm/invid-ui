import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { PhoneInput } from "@invid/ui/phone-input";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function PhoneInputRoute() {
  const [phone, setPhone] = useState("");
  const resultLabel = phone || "No phone number entered yet";

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">PhoneInput tester</P>
          <P variant="muted">
            Opens the phone keyboard and offers the device's saved phone number
            as an autofill suggestion.
          </P>
        </Container>

        <Container variant="section">
          <P variant="label">Phone</P>
          <PhoneInput
            accessibilityLabel="Phone"
            onChangeText={setPhone}
            placeholder="+34 600 123 456"
            value={phone}
          />
        </Container>

        <Container variant="section">
          <P variant="muted">Result</P>
          <P>{resultLabel}</P>
        </Container>
      </Container>
    </ScrollView>
  );
}
