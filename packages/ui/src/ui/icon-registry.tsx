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

export type IconName = keyof typeof ICON;
