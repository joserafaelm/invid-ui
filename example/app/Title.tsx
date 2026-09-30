import { Stack } from "expo-router/stack";
import { P } from "invid-ui/p";
import { Title } from "invid-ui/title";
import { View } from "react-native";




export default function TitleRoute() {
  return (
    <View className="flex-1 gap-6 bg-background px-6 py-8">
      <Stack.Screen options={{ title: "Title" }} />

      <View className="gap-3">
        <P variant="lead">Title</P>
        <Title variant="lead">Lead title</Title>
        <Title>Default title</Title>
        <Title variant="muted">Muted title</Title>
      </View>

      <View className="gap-3">
        <P variant="lead">Native props</P>
        <Title numberOfLines={1} selectable={true}>
          This title supports native Text props and semantic variants.
        </Title>
      </View>
    </View>
  );
}