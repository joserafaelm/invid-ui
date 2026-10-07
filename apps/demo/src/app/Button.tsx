import { screenStyles } from "@/styles/screen";
import { Button } from "@invid/ui/button";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ButtonRoute() {
  const [pressCount, setPressCount] = useState(0);
  const [lastPressed, setLastPressed] = useState("None yet");

  function handlePress(label: string) {
    setLastPressed(label);
    setPressCount((count) => count + 1);
  }

  return (
    <SafeAreaView style={screenStyles.screen}>
      <Stack.Screen options={{ title: "Button" }} />

      <View style={screenStyles.section}>
        <P variant="lead">Button tester</P>
        <P variant="muted">Try each public variant and interaction state.</P>
      </View>

      <View style={screenStyles.section}>
        <P variant="muted">Variants</P>
        <View style={screenStyles.section}>
          <Button
            onPress={() => handlePress("Default")}
            title="Default button"
          />
          <Button
            onPress={() => handlePress("Primary")}
            title="Primary button"
            variant="primary"
          />
          <Button
            onPress={() => handlePress("Secondary")}
            title="Secondary button"
            variant="secondary"
          />
          <Button
            onPress={() => handlePress("Muted")}
            title="Muted button"
            variant="muted"
          />
        </View>
      </View>

      <View style={screenStyles.section}>
        <P variant="muted">Native props</P>
        <View style={screenStyles.section}>
          <Button
            disabled={true}
            onPress={() => handlePress("Disabled")}
            title="Disabled button"
          />
        </View>
      </View>

      <View style={screenStyles.section}>
        <P variant="muted">Last pressed: {lastPressed}</P>
        <P variant="muted">Total presses: {pressCount}</P>
      </View>
    </SafeAreaView>
  );
}
