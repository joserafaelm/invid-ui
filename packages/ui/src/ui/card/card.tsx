import type { ComponentProps } from "react";
import { Pressable } from "react-native";
import { Badge } from "../badge";
import { Container } from "../container";
import { P } from "../p";
import { Title } from "../title";
import { CardImage } from "./card-image";

type NativePressableProps = ComponentProps<typeof Pressable>;

export type CardProps = Omit<
  NativePressableProps,
  "accessibilityRole" | "children" | "className" | "onPress"
> & {
  eyebrow: string;
  title: string;
  subtitle: string;
  elevated?: boolean;
  imageUrl?: string;
  onPress?: NativePressableProps["onPress"];
};

export function Card({
  eyebrow,
  title,
  subtitle,
  elevated = false,
  imageUrl,
  onPress,
  ...pressableProps
}: CardProps) {
  const cardProps = {
    ...pressableProps,
    accessibilityLabel:
      pressableProps.accessibilityLabel ?? `${eyebrow}: ${title}`,
    accessibilityRole: onPress ? ("button" as const) : undefined,
    onPress,
  };
  return (
    <Pressable {...cardProps}>
      <Container variant={elevated ? "cardSurfaceElevated" : "cardSurface"}>
        {imageUrl ? <CardImage url={imageUrl} /> : null}
        <Container variant="cardContent">
          <Badge label={eyebrow} size="sm" variant="primary" />
          <Title variant="default">{title}</Title>
          <P variant="muted">{subtitle}</P>
        </Container>
      </Container>
    </Pressable>
  );
}
