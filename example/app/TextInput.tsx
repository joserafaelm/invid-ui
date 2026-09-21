import { Stack } from "expo-router/stack";
import { P } from "invid-ui/p";
import { TextInput } from "invid-ui/text-input";
import { useState } from "react";
import { View } from "react-native";

export default function TextInputRoute() {
  const [text, setText] = useState("");

  return (
    <View className="flex-1 gap-6 bg-background px-6 py-8">
      <Stack.Screen options={{ title: "TextInput" }} />

      <View className="gap-1">
        <P variant="lead">TextInput tester</P>
        <P variant="muted">Type below to see the value update live.</P>
      </View>

      <View className="gap-3">
        <P variant="muted">Your text</P>
        <View className="rounded-xl border border-foreground/15 px-4 py-3">
          <TextInput
            autoCapitalize="sentences"
            onChangeText={setText}
            placeholder="Start typing..."
            value={text}
          />
        </View>
      </View>



      <View className="gap-2 rounded-xl bg-foreground/5 p-4">
        <P variant="muted">Result</P>
        <P>{text || "Nothing typed yet"}</P>
        <P variant="muted">Characters: {text.length}</P>
      </View>
    </View>
  );
}
