import type { ComponentPropsWithRef } from "react";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import type { AvatarSize, AvatarStatus } from "#/ui/avatar/avatar.styles";
import {
  AVATAR_FALLBACK_ICON_SIZES,
  AVATAR_STATUS_LABELS,
  avatarInitialsVariants,
  avatarStatusVariants,
  avatarVariants,
  getAvatarInitials,
} from "#/ui/avatar/avatar.styles";
import { Icon } from "#/ui/icon";

export type { AvatarSize, AvatarStatus } from "#/ui/avatar/avatar.styles";

type NativeViewProps = ComponentPropsWithRef<typeof View>;
type NativeImageProps = ComponentPropsWithRef<typeof Image>;

export type AvatarProps = Omit<
  NativeViewProps,
  "accessibilityRole" | "children" | "className"
> & {
  source?: NativeImageProps["source"];
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  onImageError?: NativeImageProps["onError"];
  imageStyle?: NativeImageProps["style"];
};

export function Avatar({
  accessibilityLabel,
  imageStyle,
  name,
  onImageError,
  size = "md",
  status,
  source,
  ...viewProps
}: AvatarProps) {
  const [failedSourceKey, setFailedSourceKey] = useState<string | null>(null);
  const initials = getAvatarInitials(name);
  const sourceKey =
    source === undefined
      ? undefined
      : typeof source === "number"
        ? `asset:${source}`
        : `source:${JSON.stringify(source)}`;
  const showImage = source !== undefined && sourceKey !== failedSourceKey;

  const className = avatarVariants({ size });
  const initialsClassName = avatarInitialsVariants({ size });
  const accessibleViewProps = {
    ...viewProps,
    accessibilityLabel:
      accessibilityLabel ??
      (status
        ? `${name ?? "Avatar"}, ${AVATAR_STATUS_LABELS[status]}`
        : (name ?? "Avatar")),
    accessibilityRole: "image" as const,
  };
  const wrapperProps = { ...accessibleViewProps, className: "relative" };
  const avatarProps = { className };
  const statusProps = status
    ? { accessible: false, className: avatarStatusVariants({ size, status }) }
    : undefined;
  const imageProps = {
    accessibilityIgnoresInvertColors: true,
    accessible: false,
    className: "h-full w-full",
    onError: (
      event: Parameters<NonNullable<NativeImageProps["onError"]>>[0],
    ) => {
      if (sourceKey !== undefined) {
        setFailedSourceKey(sourceKey);
      }
      onImageError?.(event);
    },
    resizeMode: "cover" as const,
    source,
    style: imageStyle,
  };
  const initialsProps = { className: initialsClassName, children: initials };
  const fallbackContent = initials ? (
    <Text {...initialsProps} />
  ) : (
    <Icon name="user" size={AVATAR_FALLBACK_ICON_SIZES[size]} />
  );
  const content = showImage ? <Image {...imageProps} /> : fallbackContent;

  return (
    <View {...wrapperProps}>
      <View {...avatarProps}>{content}</View>
      {statusProps ? <View {...statusProps} /> : null}
    </View>
  );
}
