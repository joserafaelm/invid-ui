import { Container } from "@invid/ui/container";
import { DatePicker } from "@invid/ui/date-picker";
import { P } from "@invid/ui/p";
import { TimePicker } from "@invid/ui/time-picker";
import { Stack } from "expo-router/stack";
import { useState } from "react";

export default function DateTimePickerRoute() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  return (
    <Container variant="screen">
      <Stack.Screen options={{ title: "Date & Time Picker" }} />
      <Container variant="section">
        <P variant="lead">Date and time pickers</P>
        <P variant="muted">
          Tap a field to open the device picker. Cancel keeps the current value.
        </P>
      </Container>
      <Container variant="section">
        <P variant="muted">Date</P>
        <DatePicker onChange={setDate} value={date} />
      </Container>
      <Container variant="section">
        <P variant="muted">Time</P>
        <TimePicker onChange={setTime} value={time} />
      </Container>
      <Container variant="section">
        <P variant="muted">Selected values</P>
        <P>Date: {date?.toLocaleDateString() ?? "None"}</P>
        <P>Time: {time?.toLocaleTimeString() ?? "None"}</P>
      </Container>
    </Container>
  );
}
  