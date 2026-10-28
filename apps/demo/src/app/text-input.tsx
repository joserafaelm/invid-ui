import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { TextInput } from "@invid/ui/text-input";
import { Stack } from "expo-router/stack";
import { useState } from "react";

export default function TextInputRoute() {
  const [text, setText] = useState("");

  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "TextInput" }} />

      <Container variant="section">
        <P variant="lead">TextInput tester</P>
        <P variant="muted">Type below to see the value update live.</P>
      </Container>

      <Container variant="section">
        <P variant="muted">Your text</P>
        <Container variant="card">
          <TextInput
            autoCapitalize="sentences"
            onChangeText={setText}
            placeholder="Start typing..."
            value={text}
          />
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Result</P>
        <P>{text || "Nothing typed yet"}</P>
        <P variant="muted">Characters: {text.length}</P>
      </Container>
    </Container>
  );
}
