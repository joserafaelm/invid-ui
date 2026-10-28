import { Button } from "@invid/ui/button";
import { Container } from "@invid/ui/container";
import { Icon } from "@invid/ui/icon";
import { P } from "@invid/ui/p";
import type { TableAction, TeamMemberRow } from "@invid/ui/table";
import { Table } from "@invid/ui/table";
import { Stack } from "expo-router/stack";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";

const TABLE_DEMO_STYLES = StyleSheet.create({
  verticalViewport: { maxHeight: 400 },
});

const TEAM_MEMBERS: TeamMemberRow[] = [
  {
    name: "Alice Martin",
    role: "Engineer",
    status: "Active",
    joined: "2022-03-14",
    score: 94,
  },
  {
    name: "Bob Chen",
    role: "Designer",
    status: "Active",
    joined: "2021-11-02",
    score: 88,
  },
  {
    name: "Carol Davis",
    role: "Manager",
    status: "Away",
    joined: "2020-07-19",
    score: 76,
  },
  {
    name: "David Lee",
    role: "Engineer",
    status: "Inactive",
    joined: "2023-01-05",
    score: 61,
  },
  {
    name: "Eva Müller",
    role: "Analyst",
    status: "Active",
    joined: "2022-09-28",
    score: 99,
  },
  {
    name: "Frank Osei",
    role: "Designer",
    status: "Away",
    joined: "2019-05-11",
    score: 73,
  },
];

const TEAM_ACTIONS: TableAction[] = [
  {
    label: "Edit",
    icon: "pencil",
    onPress: (member) => Alert.alert("Edit member", member.name),
  },
];

export default function TableRoute() {
  const [compact, setCompact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRows, setShowRows] = useState(true);

  return (
    
    <Container variant="screen">
      <Stack.Screen options={{ title: "Table" }} />
      <Container variant="section">
        <P variant="lead">Team members</P>
        <P variant="muted">
          Sort columns, check member status, or use the row action.
        </P>
        <ScrollView horizontal ={true}>
        <Container variant="row" style={{ gap: 8, marginTop: 8, marginBottom: 8 }}>
          <Button
            icon={<Icon name="grid" size={16} />}
            onPress={() => setCompact((value) => !value)}
            title={compact ? "Comfortable density" : "Compact density"}
          />
          <Button
            icon={<Icon name="bell" size={16} />}
            onPress={() => setLoading((value) => !value)}
            title={loading ? "Show table" : "Show loading"}
          />
          <Button
            icon={<Icon name="people" size={16} />}
            onPress={() => setShowRows((value) => !value)}
            title={showRows ? "Show empty state" : "Show members"}
          />
        </Container>
        </ScrollView>
      </Container>

      <ScrollView horizontal={true}>
        <ScrollView
          nestedScrollEnabled={true}
          stickyHeaderIndices={[1]}
          style={TABLE_DEMO_STYLES.verticalViewport}
        >
          <Table
            actions={TEAM_ACTIONS}
            density={compact ? "compact" : "comfortable"}
            loading={loading}
            rows={showRows ? TEAM_MEMBERS : []}
          />
        </ScrollView>
      </ScrollView>
    </Container>
  );
}
