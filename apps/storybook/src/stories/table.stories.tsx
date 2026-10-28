import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import type { TableAction, TableDensity, TeamMemberRow } from "@invid/ui/table";
import { Table } from "@invid/ui/table";
import type { Meta, StoryObj } from "@storybook/react-native";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Uniwind } from "uniwind";

const TABLE_STORY_STYLES = StyleSheet.create({
  narrow: { width: 320 },
  verticalViewport: { maxHeight: 360 },
});

const TEAM_ROWS: TeamMemberRow[] = [
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
    onPress: (row) => console.info("Edit team member", row.name),
  },
  {
    label: "More actions",
    icon: "threeDotsVertical",
    onPress: (row) => console.info("More actions for", row.name),
  },
];

const LONG_ROWS = Array.from({ length: 48 }, (_, index) => {
  const member = TEAM_ROWS[index % TEAM_ROWS.length]!;
  const year = 2018 + (index % 6);
  const month = String((index % 12) + 1).padStart(2, "0");
  const day = String((index % 27) + 1).padStart(2, "0");
  return { ...member, joined: `${year}-${month}-${day}` };
});

const meta = {
  title: "Data Display/Table",
  component: Table,
  args: {
    caption: "Team members",
    density: "comfortable",
    loading: false,
    rows: TEAM_ROWS,
    actions: TEAM_ACTIONS,
    sort: true,
  },
  argTypes: {
    caption: { control: "text" },
    density: {
      control: { type: "select" },
      options: ["comfortable", "compact"] satisfies TableDensity[],
    },
    loading: { control: "boolean" },
    rows: { control: "object" },
    actions: { control: false },
    sort: { control: "boolean" },
    emptyContent: { control: false },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: { density: "compact" },
};

export const Loading: Story = {
  args: { loading: true },
};

export const EmptyState: Story = {
  args: { rows: [] },
};

export const EmptyStateCustomContent: Story = {
  args: {
    rows: [],
    emptyContent: (
      <Container variant="centered">
        <P variant="default">No team members yet</P>
        <P variant="muted">Invite someone to see them listed here.</P>
      </Container>
    ),
  },
};

export const LongListStickyHeader: Story = {
  args: { rows: LONG_ROWS },
  render: (args) => (
    <ScrollView horizontal={true}>
      <ScrollView
        nestedScrollEnabled={true}
        stickyHeaderIndices={[1]}
        style={TABLE_STORY_STYLES.verticalViewport}
      >
        <Table {...args} />
      </ScrollView>
    </ScrollView>
  ),
};

export const NarrowContainerHorizontalScroll: Story = {
  render: (args) => (
    <View style={TABLE_STORY_STYLES.narrow}>
      <ScrollView horizontal={true}>
        <ScrollView
          nestedScrollEnabled={true}
          stickyHeaderIndices={[1]}
          style={TABLE_STORY_STYLES.verticalViewport}
        >
          <Table {...args} />
        </ScrollView>
      </ScrollView>
    </View>
  ),
};

function DarkModeTable(args: ComponentProps<typeof Table>) {
  useEffect(() => {
    const previousTheme = Uniwind.currentTheme;
    Uniwind.setTheme("dark");
    return () => Uniwind.setTheme(previousTheme);
  }, []);

  return <Table {...args} />;
}

export const DarkMode: Story = {
  render: (args) => <DarkModeTable {...args} />,
};

export const SortableNoActions: Story = {
  args: { actions: [], sort: true },
};

export const ReadOnly: Story = {
  args: { actions: [], sort: false },
};
