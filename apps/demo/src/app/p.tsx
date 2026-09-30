import { P } from "@invid/ui/p";
import { View } from "react-native";
import { screenStyles } from "@/styles/screen";

export default function PRoute() {
  return (
    <View style={screenStyles.screen}>
      <View style={screenStyles.section}>
        <P variant="lead">Lead</P>
        <P>
          Default paragraph text uses the semantic foreground color and supports
          dynamic type.
        </P>
        <P variant="muted">
          Muted paragraphs use the secondary semantic foreground color.
        </P>
      </View>

      <View style={screenStyles.section}>
        <P variant="lead">Native props</P>
        <P numberOfLines={2} selectable={true}>
          P accepts native React Native Text props, including selection,
          truncation, accessibility, style, and ref. Styling is selected through
          semantic variants instead of class names.
        </P>
      </View>
    </View>
  );
}
