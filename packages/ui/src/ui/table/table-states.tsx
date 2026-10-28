import type { ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../container";
import { P } from "../p";

export function TableLoading() {
  return (
    <Container variant="centered">
      <ActivityIndicator />
      <P variant="muted">Loading team members...</P>
    </Container>
  );
}

export function TableEmpty({ children }: { children: ReactNode }) {
  return (
    <Container variant="tableEmpty">
      {typeof children === "string" || typeof children === "number" ? (
        <P variant="muted">{children}</P>
      ) : (
        children
      )}
    </Container>
  );
}