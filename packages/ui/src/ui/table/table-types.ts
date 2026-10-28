import type { ReactNode } from "react";
import type { BadgeVariant } from "../badge";
import type { IconName } from "../icons/icon";

export type TableDensity = "comfortable" | "compact";
export type TableSortColumn = "name" | "role" | "status" | "joined" | "score";
export type TeamMemberStatus = "Active" | "Away" | "Inactive";
export type TeamMemberStatusBadge = {
  label: TeamMemberStatus;
  variant: Extract<BadgeVariant, "success" | "warning" | "muted">;
};

export type TeamMemberRow = {
  id?: string;
  name: string;
  role: string;
  status: TeamMemberStatus;
  joined: string;
  score: number;
};

export type TableAction = {
  label: string;
  icon: IconName;
  onPress: (row: TeamMemberRow) => void;
};

export type TableProps = {
  caption?: string;
  density?: TableDensity;
  loading?: boolean;
  rows?: TeamMemberRow[];
  actions?: TableAction[];
  sort?: boolean;
  emptyContent?: ReactNode;
};
