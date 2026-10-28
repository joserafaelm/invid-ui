import { Avatar } from "@invid/ui/avatar";
import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import { StyleSheet } from "react-native";

const SAMPLE_AVATAR_SOURCE = {
  uri: "https://i.pravatar.cc/150?img=12",
};

const styles = StyleSheet.create({
  row: { gap: 8, marginVertical: 3 },
});

export default function AvatarRoute() {
  return (
    <Container variant="screen">
      <Container variant="section">
        <P variant="lead">Avatar</P>
        <P variant="muted">
          Avatars show a profile image when available, then fall back to
          initials or a person icon. Add a status to show availability.
        </P>
      </Container>

      <Container variant="section">
        <P variant="muted">Image</P>
        <Container style={styles.row} variant="row">
          <Avatar
            name="Sample Person"
            source={SAMPLE_AVATAR_SOURCE}
            status="online"
          />
          <P>Sample Person</P>
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">Initials</P>
        <Container style={styles.row} variant="row">
          <Avatar name="Yariel Santiago" size="sm" status="online" />
          <Avatar name="Jordan Lee" />
          <Avatar name="Alex Morgan" size="lg" status="busy" />
        </Container>
      </Container>

      <Container variant="section">
        <P variant="muted">No name</P>
        <Avatar accessibilityLabel="User profile" />
      </Container>
    </Container>
  );
}
