import type { ComponentProps, Ref } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

export type ContainerVariant =
  | "default"
  | "centered"
  | "row"
  | "screen"
  | "section"
  | "cardContent"
  | "cardSurface"
  | "cardSurfaceElevated"
  | "tableHeader"
  | "tableHeaderContent"
  | "tableRow"
  | "tableCell"
  | "tableAction"
  | "tableEmpty"
  | "table"
  | "card";
export type ContainerTableDensity = "comfortable" | "compact";
export type ContainerTableColumn =
  | "name"
  | "role"
  | "status"
  | "joined"
  | "score"
  | "actions";
export type ContainerTableContent = "default" | "person" | "actions";

type NativeViewProps = ComponentProps<typeof View>;

const CONTAINER_VARIANT_STYLES = {
  default: "flex-col",
  centered: "items-center justify-center",
  row: "flex-row items-center",
  screen: "flex-1 gap-6 px-6 py-8",
  section: "gap-2",
  cardContent: "gap-2 p-4",
  cardSurface: "overflow-hidden rounded-2xl border border-border bg-background",
  cardSurfaceElevated: "overflow-hidden rounded-2xl border border-border bg-background shadow-md",
  tableHeader: "flex-row border-b border-border bg-muted-background",
  tableHeaderContent: "flex-row items-center gap-space-2",
  tableRow: "flex-row border-b border-border",
  tableCell: "justify-center px-space-3",
  tableAction: "items-center justify-center rounded-md p-space-2",
  tableEmpty: "items-center justify-center p-space-6",
  table: "flex-col gap-space-3",
  card: "gap-2 rounded-xl border border-muted-foreground/20 bg-background p-4",
} as const satisfies Record<ContainerVariant, string>;

const TABLE_COLUMN_STYLES = {
  name: "min-w-48",
  role: "min-w-32",
  status: "min-w-28",
  joined: "min-w-36",
  score: "min-w-24",
  actions: "min-w-24",
} as const satisfies Record<ContainerTableColumn, string>;

const containerVariants = tv({
  variants: {
    variant: CONTAINER_VARIANT_STYLES,
    tableDensity: {
      comfortable: "py-space-3",
      compact: "py-space-2",
    },
    tableColumn: TABLE_COLUMN_STYLES,
    tableContent: {
      default: "",
      person: "flex-row items-center gap-space-2",
      actions: "flex-row items-center gap-space-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ContainerProps = Omit<NativeViewProps, "className"> & {
  variant?: ContainerVariant;
  tableDensity?: ContainerTableDensity;
  tableColumn?: ContainerTableColumn;
  tableContent?: ContainerTableContent;
  ref?: Ref<View>;
};

export function Container({
  ref,
  variant,
  tableDensity,
  tableColumn,
  tableContent,
  ...viewProps
}: ContainerProps) {
  const className = containerVariants({
    variant,
    tableDensity,
    tableColumn,
    tableContent,
  });
  const uniwindViewProps = { ...viewProps, className };

  return <View ref={ref} {...uniwindViewProps} />;
}