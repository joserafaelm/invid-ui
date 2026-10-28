import { screenStyles } from "@/styles/screen";
import { Button } from "@invid/ui/button";
import { Icon } from "@invid/ui/icon";
import { P } from "@invid/ui/p";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

const P_ROUTE = "/p";
const AVATAR_ROUTE = "/Avatar";
const BADGE_ROUTE = "/Badge";
const CARD_ROUTE = "/Card";
const TABLE_ROUTE = "/Table";
const BUTTON_ROUTE = "/Button";
const TEXT_INPUT_ROUTE = "/text-input";
const NUMBER_INPUT_ROUTE = "/NumberInput";
const FORM_ROUTE = "/Form";
const TITLE_ROUTE = "/Title";
const ICONS_ROUTE = "/Icons";
const CONTAINER_ROUTE = "/container";
const DATE_TIME_PICKER_ROUTE = "/DateTimePicker";

export default function OverviewRoute() {
  return (
    <ScrollView>
      <View style={screenStyles.screen}>
        <View style={screenStyles.section}>
          <P variant="lead">INVID UI</P>
          <P variant="muted">
            Open the menu to browse a demo screen for each public component.
          </P>

          <Link asChild={true} href={AVATAR_ROUTE}>
            <Button
              icon={<Icon name="personFill" size={16} />}
              title="Avatar"
            />
          </Link>
          <Link asChild={true} href={BADGE_ROUTE}>
            <Button
              icon={<Icon name="checkCircle" size={16} />}
              title="Badge"
            />
          </Link>
          <Link asChild={true} href={CARD_ROUTE}>
            <Button icon={<Icon name="box" size={16} />} title="Card" />
          </Link>
          <Link asChild={true} href={TABLE_ROUTE}>
            <Button icon={<Icon name="grid" size={16} />} title="Table" />
          </Link>
          <Link asChild={true} href={P_ROUTE}>
            <Button icon={<Icon name="type" size={16} />} title="P" />
          </Link>
          <Link asChild={true} href={BUTTON_ROUTE}>
            <Button icon={<Icon name="pointer" size={16} />} title="Button" />
          </Link>
          <Link asChild={true} href={TEXT_INPUT_ROUTE}>
            <Button
              icon={<Icon name="clipboardList" size={16} />}
              title="Text Input"
            />
          </Link>
          <Link asChild={true} href={NUMBER_INPUT_ROUTE}>
            <Button
              icon={<Icon name="hash" size={16} />}
              title="Number Input"
            />
          </Link>
          <Link asChild={true} href={FORM_ROUTE}>
            <Button
              icon={<Icon name="clipboardList" size={16} />}
              title="Form"
            />
          </Link>

          <Link asChild={true} href={TITLE_ROUTE}>
            <Button icon={<Icon name="type" size={16} />} title="Title" />
          </Link>
          <Link asChild={true} href={ICONS_ROUTE}>
            <Button icon={<Icon name="shapes" size={16} />} title="Icons" />
          </Link>
          <Link asChild={true} href={CONTAINER_ROUTE}>
            <Button icon={<Icon name="box" size={16} />} title="Container" />
          </Link>
          <Link asChild={true} href={DATE_TIME_PICKER_ROUTE}>
            <Button
              icon={<Icon name="calendar" size={16} />}
              title="Date & Time Picker"
            />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}