import type { IconName } from "@invid/ui/icons";

type DemoScreen = {
  name: string;
  title: string;
  icon: IconName;
};

export const OVERVIEW_SCREEN = { name: "index", title: "Overview" } as const;

export const COMPONENT_SCREENS = [
  { name: "p", title: "P", icon: "type" },
  { name: "title", title: "Title", icon: "type" },
  { name: "button", title: "Button", icon: "pointer" },
  { name: "text-input", title: "Text Input", icon: "clipboardList" },
  { name: "number-input", title: "Number Input", icon: "hash" },
  { name: "text-area", title: "Text Area", icon: "clipboardList" },
  { name: "phone-input", title: "Phone Input", icon: "hash" },
  { name: "select", title: "Select", icon: "circle-chevron-right" },
  { name: "radio-group", title: "Radio Group", icon: "star" },
  { name: "date-time-picker", title: "Date & Time Picker", icon: "calendar" },
  { name: "form", title: "Form", icon: "clipboardList" },
  { name: "container", title: "Container", icon: "box" },
  { name: "icons", title: "Icons", icon: "shapes" },
  { name: "avatar", title: "Avatar", icon: "user" },
] as const satisfies readonly DemoScreen[];
