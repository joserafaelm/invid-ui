import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { TextArea } from "@invid/ui/text-area";
import { useState } from "react";
import { ScrollView } from "react-native";

const MAX_LENGTH = 280;

export default function TextAreaRoute() {
  const [text, setText] = useState("");
  const remainingLabel = `${MAX_LENGTH - text.length} characters left`;

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">TextArea tester</P>
          <P variant="muted">
            Write several lines. The field starts at four lines and grows with
            its content.
          </P>
        </Container>

        <Container variant="section">
          <P variant="label">Notes</P>
          <TextArea
            accessibilityLabel="Notes"
            maxLength={MAX_LENGTH}
            onChangeText={setText}
            placeholder="Write a few lines..."
            value={text}
          />
          <P variant="muted">{remainingLabel}</P>
        </Container>

        <Container variant="section">
          <P variant="label">Invalid</P>
          <TextArea
            accessibilityLabel="Invalid notes"
            invalid={true}
            placeholder="Shown with the danger border"
          />
          <P variant="danger">This field shows an error.</P>
        </Container>
      </Container>
    </ScrollView>
  );
}
