import { P } from "@invid/ui/p";
import { Title } from "@invid/ui/title";
import { Stack } from "expo-router/stack";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TitleRoute() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Title" }} />

      <View style={{ padding: 16 }}>
        <P variant="lead">Title</P>
        <Title variant="lead">Lead title</Title>
        <Title>Default title</Title>
        <Title variant="muted">Muted title</Title>
      </View>

      <View style={{ padding: 16 }}>
        <P variant="lead">Native props</P>
        <Title numberOfLines={2} selectable={true}>
          This title supports native Text props and semantic variants.
        </Title>
      </View>
    </SafeAreaView>
  );
}
