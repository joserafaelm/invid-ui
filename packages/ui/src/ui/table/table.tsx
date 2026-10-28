import { useMemo, useState } from "react";
import { P } from "../p";
import { TableHeader } from "./table-header";
import { TableDataRow } from "./table-row";
import { TableEmpty, TableLoading } from "./table-states";
import type { TableProps, TableSortColumn, TeamMemberRow } from "./table-types";

export type {
  TableAction,
  TableDensity,
  TableProps,
  TableSortColumn,
  TeamMemberRow,
  TeamMemberStatus
} from "./table-types";

function compareRows(
  first: TeamMemberRow,
  second: TeamMemberRow,
  column: TableSortColumn,
) {
  const firstValue = first[column];
  const secondValue = second[column];

  return typeof firstValue === "number" && typeof secondValue === "number"
    ? firstValue - secondValue
    : String(firstValue).localeCompare(String(secondValue));
}

export function Table({
  caption = "Team members",
  density = "comfortable",
  loading = false,
  rows = [],
  actions = [],
  sort = true,
  emptyContent = "No data available.",
}: TableProps) {
  const [sortState, setSortState] = useState<{
    column: TableSortColumn;
    direction: "asc" | "desc";
  }>();

  const sortedRows = useMemo(() => {
    if (!sort || !sortState) return rows;

    const direction = sortState.direction === "asc" ? 1 : -1;
    return [...rows].sort(
      (first, second) =>
        direction * compareRows(first, second, sortState.column),
    );
  }, [rows, sort, sortState]);

  const handleSort = (column: TableSortColumn) => {
    setSortState((current) => ({
      column,
      direction:
        current?.column === column && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <>
      <P variant="lead">{caption}</P>

      <TableHeader
        actions={actions}
        density={density}
        onSort={handleSort}
        sortable={sort}
        {...(sort && sortState
          ? {
              sortColumn: sortState.column,
              sortDirection: sortState.direction,
            }
          : {})}
      />

      {loading ? (
        <TableLoading />
      ) : sortedRows.length > 0 ? (
        sortedRows.map((row) => (
          <TableDataRow
            actions={actions}
            density={density}
            key={
              row.id ??
              `${row.name}-${row.role}-${row.status}-${row.joined}-${row.score}`
            }
            row={row}
          />
        ))
      ) : (
        <TableEmpty>{emptyContent}</TableEmpty>
      )}
    </>
  );
}