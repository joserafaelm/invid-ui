import { screenStyles } from "@/styles/screen";
import { Button } from "@invid/ui/button";
import { Icon } from "@invid/ui/icons";
import { P } from "@invid/ui/p";
// @ts-expect-error
import IconBox from "@tabler/icons-react-native/IconBox";
// @ts-expect-error
import IconForms from "@tabler/icons-react-native/IconForms";
// @ts-expect-error
import IconHandClick from "@tabler/icons-react-native/IconHandClick";
// @ts-expect-error
import IconIcons from "@tabler/icons-react-native/IconIcons";
// @ts-expect-error
import IconNumbers from "@tabler/icons-react-native/IconNumbers";
// @ts-expect-error
import IconTextSize from "@tabler/icons-react-native/IconTextSize";
// @ts-expect-error
import IconTypography from "@tabler/icons-react-native/IconTypography";
import { Link } from "expo-router";
import { View } from "react-native";

const P_ROUTE = "/p";
const BUTTON_ROUTE = "/Button";
const TEXT_INPUT_ROUTE = "/text-input";
const NUMBER_INPUT_ROUTE = "/NumberInput";
const FORM_ROUTE = "/Form";
const TITLE_ROUTE = "/Title";
const ICONS_ROUTE = "/Icons";
const CONTAINER_ROUTE = "/container";

export default function OverviewRoute() {
  return (
    <View style={screenStyles.screen}>
      <View style={screenStyles.section}>
        <P variant="lead">INVID UI</P>
        <P variant="muted">
          Open the menu to browse a demo screen for each public component.
        </P>

        <Link asChild={true} href={P_ROUTE}>
          <Button
            icon={<Icon icon={IconTypography} size="sm" />}
            title="P"
          />
        </Link>
        <Link asChild={true} href={BUTTON_ROUTE}>
          <Button
            icon={<Icon icon={IconHandClick} size="sm" />}
            title="Button"
          />
        </Link>
        <Link asChild={true} href={TEXT_INPUT_ROUTE}>
          <Button
            icon={<Icon icon={IconForms} size="sm" />}
            title="Text Input"
          />
        </Link>
        <Link asChild={true} href={NUMBER_INPUT_ROUTE}>
          <Button
            icon={<Icon icon={IconNumbers} size="sm" />}
            title="Number Input"
          />
        </Link>
        <Link asChild={true} href={FORM_ROUTE}>
          <Button
            icon={<Icon icon={IconForms} size="sm" />}
            title="Form"
          />
        </Link>
        
        <Link asChild={true} href={TITLE_ROUTE}>
          <Button
            icon={<Icon icon={IconTextSize} size="sm" />}
            title="Title"
          />
        </Link>
        <Link asChild={true} href={ICONS_ROUTE}>
          <Button 
          icon={<Icon icon={IconIcons} size="sm" />} 
          title="Icons" />
        </Link>
        <Link asChild={true} href={CONTAINER_ROUTE}>
          <Button
            icon={<Icon icon={IconBox} size="sm" />}
            title="Container"
          />
        </Link>
      </View>
    </View>
  );
}
