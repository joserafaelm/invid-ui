import "../app.css";

import { Stack } from "expo-router/stack";

const SCREEN_OPTIONS = {
  headerBackButtonDisplayMode: "minimal",
} as const;

export default function RootLayout() {
  return <Stack screenOptions={SCREEN_OPTIONS} />;
}
