import { Pressable } from "react-native";
import { Avatar } from "../avatar/avatar";
import { Badge } from "../badge";
import { Container } from "../container";
import { Icon } from "../icons/icon";
import { P } from "../p";
import {
  getStatusVariant,
  TABLE_CELL_TEXT_VARIANT,
} from "./table-styles";
import type { TableAction, TableDensity, TeamMemberRow } from "./table-types";

function TableRowActions({
  actions,
  row,
}: {
  actions: TableAction[];
  row: TeamMemberRow;
}) {
  return (
    <Container
      tableColumn="actions"
      tableContent="actions"
      tableDensity="compact"
      variant="tableCell"
    >
      {actions.map((action) => {
        const buttonProps = {
          accessibilityLabel: `${action.label} ${row.name}`,
          accessibilityRole: "button" as const,
          onPress: () => action.onPress(row),
        };

        return (
          <Pressable
            key={`${action.label}-${action.icon}`}
            {...buttonProps}
          >
            <Icon name={action.icon} size={16} variant="muted" />
          </Pressable>
        );
      })}
    </Container>
  );
}

export function TableDataRow({
  row,
  density,
  actions,
}: {
  row: TeamMemberRow;
  density: TableDensity;
  actions: TableAction[];
}) {
  return (
    <Container tableDensity={density} variant="tableRow">
      <Container
        tableColumn="name"
        tableContent="person"
        tableDensity={density}
        variant="tableCell"
      >
        <Avatar name={row.name} size="sm" />
        <P variant={TABLE_CELL_TEXT_VARIANT}>{row.name}</P>
      </Container>

      <Container
        tableColumn="role"
        tableDensity={density}
        variant="tableCell"
      >
        <P variant={TABLE_CELL_TEXT_VARIANT}>{row.role}</P>
      </Container>

      <Container
        tableColumn="status"
        tableDensity={density}
        variant="tableCell"
      >
        <Badge
          label={row.status}
          size="sm"
          variant={getStatusVariant(row.status)}
        />
      </Container>

      <Container
        tableColumn="joined"
        tableDensity={density}
        variant="tableCell"
      >
        <P variant={TABLE_CELL_TEXT_VARIANT}>{row.joined}</P>
      </Container>

      <Container
        tableColumn="score"
        tableDensity={density}
        variant="tableCell"
      >
        <P variant={TABLE_CELL_TEXT_VARIANT}>{row.score}</P>
      </Container>

      {actions.length > 0 ? (
        <TableRowActions actions={actions} row={row} />
      ) : null}
    </Container>
  );
}