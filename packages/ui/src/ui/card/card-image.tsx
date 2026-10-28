import { Image } from "react-native";
import { tv } from "tailwind-variants";

const cardImageVariants = tv({ base: "aspect-video w-full" });

export function CardImage({ url }: { url: string }) {
  const imageProps = {
    accessible: false,
    className: cardImageVariants(),
    resizeMode: "cover" as const,
    source: { uri: url },
  };

  return <Image {...imageProps} />;
}
