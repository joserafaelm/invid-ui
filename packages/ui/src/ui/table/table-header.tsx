//table header

import { Pressable } from "react-native";
import { Container } from "../container";
import { Icon } from "../icons/icon";
import { P } from "../p";
import {
  TABLE_COLUMNS,
  TABLE_HEADER_TEXT_VARIANT,
} from "./table-styles";
import type {
  TableAction,
  TableDensity,
  TableSortColumn,
} from "./table-types";

type TableHeaderProps = {
  density: TableDensity;
  actions: TableAction[];
  sortable: boolean;
  sortColumn?: TableSortColumn;
  sortDirection?: "asc" | "desc";
  onSort: (column: TableSortColumn) => void;
};

function TableHeaderCell({
  column,
  label,
  density,
  sortable,
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps & { column: TableSortColumn; label: string }) {
  const content = (
    <Container variant="row">
      <P variant={TABLE_HEADER_TEXT_VARIANT}>{label}</P>
      {sortColumn === column && sortDirection ? (
        <Icon
          name={sortDirection === "asc" ? "arrowUp" : "arrowDown"}
          size={14}
          variant="muted"
        />
      ) : null}
    </Container>
  );

  const cell = (
    <Container
      tableColumn={column}
      tableDensity={density}
      variant="tableCell"
    >
      {content}
    </Container>
  );

  const pressableProps = {
    accessibilityLabel: `Sort by ${label}`,
    accessibilityRole: "button" as const,
    onPress: () => onSort(column),
  };

  return sortable ? <Pressable {...pressableProps}>{cell}</Pressable> : cell;
}

export function TableHeader(props: TableHeaderProps) {
  return (
    <Container variant="tableHeader">
      {TABLE_COLUMNS.map(({ key, label }) => (
        <TableHeaderCell
          key={key}
          {...props}
          column={key}
          label={label}
        />
      ))}
      {props.actions.length > 0 ? (
        <Container
          tableColumn="actions"
          tableDensity={props.density}
          variant="tableCell"
        >
          <P variant={TABLE_HEADER_TEXT_VARIANT}>Actions</P>
        </Container>
      ) : null}
    </Container>
  );
}