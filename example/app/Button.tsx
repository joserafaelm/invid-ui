import { Stack } from "expo-router";
import { Button } from "invid-ui/button";
import { P } from "invid-ui/p";
import { useState } from "react";
import { View } from "react-native";

export default function ButtonRoute() {
  const [pressCount, setPressCount] = useState(0);
  const [lastPressed, setLastPressed] = useState("None yet");

  function handlePress(label: string) {
    setLastPressed(label);
    setPressCount((count) => count + 1);
  }

  return (
    <View className="flex-1 gap-6 bg-background px-6 py-8">
      <Stack.Screen options={{ title: "Button" }} />

      <View className="gap-1">
        <P variant="lead">Button tester</P>
        <P variant="muted">Try each public variant and interaction state.</P>
      </View>

      <View className="gap-3">
        <P variant="muted">Variants</P>
        <View className="gap-3 rounded-xl border border-foreground/15 p-4">
          <Button
            onPress={() => handlePress("Default")}
            title="Default button"
          />
          <Button
            onPress={() => handlePress("Lead")}
            title="Lead button"
            variant="lead"
          />
          <Button
            onPress={() => handlePress("Muted")}
            title="Muted button"
            variant="muted"
          />
        </View>
      </View>

      <View className="gap-3">
        <P variant="muted">Native props</P>
        <View className="gap-3 rounded-xl border border-foreground/15 p-4">
          <Button
            disabled={true}
            onPress={() => handlePress("Disabled")}
            title="Disabled button"
          />
        </View>
      </View>

      <View className="gap-1 rounded-xl bg-foreground/5 p-4">
        <P variant="muted">Last pressed: {lastPressed}</P>
        <P variant="muted">Total presses: {pressCount}</P>
      </View>
    </View>
  );
}
