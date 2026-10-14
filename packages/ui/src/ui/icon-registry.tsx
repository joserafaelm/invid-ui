
// to search for icons, go to https://lucide.dev/icons and copy the name of the icon you want to use
// one you choose an icon, click on the "Copy Component Name" button and paste it into the ICON object below

import {
  Bell,
  Box,
  CalendarDays,
  CircleChevronRight,
  ClipboardList,
  Hash,
  Heart,
  Home,
  Mail,
  MapPin,
  Pointer,
  Search,
  Settings,
  Shapes,
  Star,
  Type,
  User
} from "lucide-react-native";

export const ICON = {
  bell: Bell,
  box: Box,
  calendar: CalendarDays,
  "clipboard-List" :  ClipboardList,
  hash: Hash,
  heart: Heart,
  home: Home,
  mail: Mail,
  mapPin: MapPin,
  pointer: Pointer,
  search: Search,
  settings: Settings,
  shapes: Shapes,
  star: Star,
  type: Type,
  user: User,
  "circle-chevron-right": CircleChevronRight 
} as const;

//to use an icon with a space in the name, use the icon name with quotes, for example: <Icon name="circle-chevron-right" />

export type IconName = keyof typeof ICON;
