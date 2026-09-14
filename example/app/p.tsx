import { Stack } from "expo-router/stack";
import { P } from "invid-ui/p";
import { View } from "react-native";

const SCREEN_OPTIONS = { title: "P" } as const;

export default function PRoute() {
  return (
    <View className="flex-1 gap-6 bg-background px-6 py-8">
      <Stack.Screen options={SCREEN_OPTIONS} />

      <View className="gap-2">
        <P variant="lead">Lead</P>
        <P>
          Default paragraph text uses the semantic foreground color and supports
          dynamic type.
        </P>
        <P variant="muted">
          Muted paragraphs use the secondary semantic foreground color.
        </P>
      </View>

      <View className="gap-2">
        <P variant="lead">Native props</P>
        <P numberOfLines={2} selectable={true}>
          P accepts native React Native Text props, including selection,
          truncation, accessibility, style, and ref. Styling is selected through
          semantic variants instead of Uniwind class names.
        </P>
      </View>
    </View>
  );
}
