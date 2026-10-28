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
  User,
} from "lucide-react-native";

/**
 * Icons available to `Icon`. To add one, find it at https://lucide.dev/icons,
 * use "Copy Component Name", import that component above, and add a key here.
 * Keys containing hyphens must be quoted, for example
 * `<Icon name="circle-chevron-right" />`.
 */
export const ICON = {
  bell: Bell,
  box: Box,
  calendar: CalendarDays,
  clipboardList: ClipboardList,
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
  "circle-chevron-right": CircleChevronRight,
} as const;

export type IconName = keyof typeof ICON;
