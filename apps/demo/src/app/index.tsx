import { P } from "@invid/ui/p";
import { View } from "react-native";
import { screenStyles } from "@/styles/screen";

export default function OverviewRoute() {
  return (
    <View style={screenStyles.screen}>
      <View style={screenStyles.section}>
        <P variant="lead">INVID UI</P>
        <P variant="muted">
          Open the menu to browse a demo screen for each public component.
        </P>
      </View>
    </View>
  );
}
