import { tv } from "tailwind-variants";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export const avatarVariants = tv({
  base: "overflow-hidden items-center justify-center rounded-full bg-muted-background",
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: { size: "md" },
});

export const avatarInitialsVariants = tv({
  base: "font-semibold text-foreground",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export const avatarStatusVariants = tv({
  base: "absolute bottom-0 right-0 rounded-full border-2 border-background",
  variants: {
    status: {
      online: "bg-success",
      offline: "bg-muted-foreground",
      busy: "bg-danger",
      away: "bg-warning",
    },
    size: {
      sm: "h-2.5 w-2.5",
      md: "h-3 w-3",
      lg: "h-3.5 w-3.5",
    },
  },
});

export const AVATAR_STATUS_LABELS = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
} as const satisfies Record<AvatarStatus, string>;

export const AVATAR_FALLBACK_ICON_SIZES = {
  sm: 18,
  md: 22,
  lg: 28,
} as const satisfies Record<AvatarSize, number>;

export function getAvatarInitials(name?: string) {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const first = words[0];
  const last = words.at(-1);
  return first
    ? `${first[0]}${words.length > 1 ? (last?.[0] ?? "") : (first[1] ?? "")}`.toUpperCase()
    : "";
}
