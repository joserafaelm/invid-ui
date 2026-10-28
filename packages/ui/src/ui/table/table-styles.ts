//table styles

import type { BadgeVariant } from "../badge";
import type { PVariant } from "../p";
import type { TableSortColumn, TeamMemberRow } from "./table-types";

export const TABLE_COLUMNS: {
  key: TableSortColumn;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "joined", label: "Joined" },
  { key: "score", label: "Score" },
];

export const TABLE_HEADER_TEXT_VARIANT: PVariant = "muted";
export const TABLE_CELL_TEXT_VARIANT: PVariant = "default";

export function getStatusVariant(
  status: TeamMemberRow["status"],
): BadgeVariant {
  if (status === "Active") return "success";
  if (status === "Away") return "warning";
  return "muted";
}