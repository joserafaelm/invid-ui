import { INVIDUIProvider } from "@invid/ui/provider";
import { useThemeColor } from "@invid/ui/theme";
import type { Decorator, Preview } from "@storybook/react-native";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  surface: { flex: 1, padding: 24 },
});

function ThemeSurface({ children }: { children: ReactNode }) {
  const backgroundColor = useThemeColor("background");
  const surfaceStyle = [styles.surface, { backgroundColor }];

  return <View style={surfaceStyle}>{children}</View>;
}

const withTheme: Decorator = (Story) => (
  <INVIDUIProvider>
    <ThemeSurface>
      <Story />
    </ThemeSurface>
  </INVIDUIProvider>
);

const preview: Preview = {
  decorators: [withTheme],
};

export default preview;
