import { INVIDUIProvider } from "@invid/ui/provider";
import { useThemeColor } from "@invid/ui/theme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COMPONENT_SCREENS, OVERVIEW_SCREEN } from "@/demo-screens";

const DEMO_SCREENS = [OVERVIEW_SCREEN, ...COMPONENT_SCREENS];

const styles = StyleSheet.create({
  root: { flex: 1 },
});

function DemoNavigator() {
  const colorScheme = useColorScheme();
  const background = useThemeColor("background");
  const foreground = useThemeColor("foreground");
  const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background,
      card: background,
      text: foreground,
    },
  };
  const screens = DEMO_SCREENS.map(({ name, title }) => (
    <Drawer.Screen key={name} name={name} options={{ title }} />
  ));

  return (
    <ThemeProvider value={theme}>
      <Drawer>{screens}</Drawer>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <INVIDUIProvider>
        <DemoNavigator />
      </INVIDUIProvider>
    </GestureHandlerRootView>
  );
}
