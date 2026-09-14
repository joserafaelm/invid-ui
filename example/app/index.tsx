import { Link } from "expo-router";
import { P } from "invid-ui/p";
import { Pressable, Text, View } from "react-native";

const P_ROUTE = "/p";

export default function ComponentCatalogRoute() {
  return (
    <View className="flex-1 gap-2 bg-background px-6 py-8">
      <P variant="lead">invid-ui</P>
      <P variant="muted">
        Manual test routes for the public component exports.
      </P>

      <Link asChild={true} href={P_ROUTE}>
        <Pressable className="mt-8 min-h-12 justify-center rounded-xl bg-foreground px-4 active:opacity-80">
          <Text className="text-center font-medium text-background">P</Text>
        </Pressable>
      </Link>
    </View>
  );
}
