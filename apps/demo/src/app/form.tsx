import { Container } from "@invid/ui/container";
import { useAppForm } from "@invid/ui/form-fields";
import { P } from "@invid/ui/p";
import { useState } from "react";
import { ScrollView } from "react-native";
import { z } from "zod";

const MAX_GUESTS = 20;
const MAX_NOTES = 280;

const COUNTRIES = [
  { label: "Argentina", value: "ar" },
  { label: "Colombia", value: "co" },
  { label: "Mexico", value: "mx" },
  { label: "Spain", value: "es" },
  { label: "United States", value: "us" },
] as const;

const SEATING = [
  { label: "Indoor", value: "indoor" },
  { label: "Terrace", value: "terrace" },
  { label: "Bar", value: "bar" },
] as const;

const reservationSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  phone: z
    .string()
    .regex(
      /^\+?[\d\s()-]{7,20}$/,
      "Enter a phone number, like +34 600 123 456.",
    ),
  guests: z
    .number({ error: "Enter the number of guests." })
    .int("Use a whole number.")
    .min(1, "At least 1 guest.")
    .max(MAX_GUESTS, `At most ${MAX_GUESTS} guests.`),
  country: z.string({ error: "Choose a country." }),
  seating: z.enum(["indoor", "terrace", "bar"], {
    error: "Choose where to sit.",
  }),
  notes: z.string().max(MAX_NOTES, `Keep notes under ${MAX_NOTES} characters.`),
});

type Reservation = z.output<typeof reservationSchema>;

type ReservationValues = {
  name: string;
  phone: string;
  guests: number | undefined;
  country: string | undefined;
  seating: Reservation["seating"] | undefined;
  notes: string;
};

const EMPTY_RESERVATION: ReservationValues = {
  name: "",
  phone: "",
  guests: 2,
  country: undefined,
  seating: undefined,
  notes: "",
};

function describeReservation(reservation: Reservation | undefined) {
  if (reservation === undefined) {
    return "No reservation yet.";
  }
  return `${reservation.name}, ${reservation.guests} guests, ${reservation.seating}, ${reservation.country}.`;
}

export default function FormRoute() {
  const [reservation, setReservation] = useState<Reservation>();
  const form = useAppForm({
    defaultValues: EMPTY_RESERVATION,
    validators: { onChange: reservationSchema },
    onSubmit: ({ value }) => {
      setReservation(reservationSchema.parse(value));
      form.reset();
    },
  });
  const reservationSummary = describeReservation(reservation);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">Reservation</P>
          <P variant="muted">
            Every field is validated by one zod schema. Errors appear after you
            leave a field or press Reserve.
          </P>
        </Container>

        <form.AppForm>
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                autoCapitalize="words"
                autoComplete="name"
                label="Name"
                placeholder="Your full name"
              />
            )}
          </form.AppField>
          <form.AppField name="phone">
            {(field) => (
              <field.PhoneField
                description="We text you if the table is ready early."
                label="Phone"
                placeholder="+34 600 123 456"
              />
            )}
          </form.AppField>
          <form.AppField name="guests">
            {(field) => <field.NumberField label="Guests" />}
          </form.AppField>
          <form.AppField name="country">
            {(field) => (
              <field.SelectField
                label="Country"
                options={COUNTRIES}
                placeholder="Choose a country"
              />
            )}
          </form.AppField>
          <form.AppField name="seating">
            {(field) => (
              <field.RadioGroupField label="Seating" options={SEATING} />
            )}
          </form.AppField>
          <form.AppField name="notes">
            {(field) => (
              <field.TextAreaField
                description="Allergies, accessibility needs, or celebrations."
                label="Notes"
                maxLength={MAX_NOTES}
              />
            )}
          </form.AppField>
          <form.SubmitButton title="Reserve" variant="primary" />
        </form.AppForm>

        <Container variant="section">
          <P variant="muted">Last reservation</P>
          <P>{reservationSummary}</P>
        </Container>
      </Container>
    </ScrollView>
  );
}
