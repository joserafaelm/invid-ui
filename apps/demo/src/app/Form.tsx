import { Container } from "@invid/ui/container";
import { useAppForm } from "@invid/ui/form-fields";
import { P } from "@invid/ui/p";
import { Stack } from "expo-router/stack";
import { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

type Person = {
  id: number;
  name: string;
  quantity: number;
};

export default function FormRoute() {
  const [people, setPeople] = useState<Person[]>([]);
  const nextPersonId = useRef(0);
  const form = useAppForm({
    defaultValues: {
      name: "",
      quantity: "",
    },
    onSubmit: async ({ value }) => {
      setPeople((currentPeople) => [
        ...currentPeople,
        {
          id: nextPersonId.current++,
          name: value.name.trim(),
          quantity: Number(value.quantity),
        },
      ]);
      form.reset();
    },
  });
  const sortedPeople = [...people].sort((first, second) =>
    first.name.localeCompare(second.name),
  );

  return (
    <Container variant = "screen">
      <ScrollView>
      <Stack.Screen options={{ title: "Form" }} />

      <Container variant="section">
        <P variant="lead">People</P>
        <P variant="muted">
          Add people with a repeat count. The list is kept in alphabetical
          order.
        </P>
      </Container>

      <form.AppField
        name="name"
        validators={{
          onChange: ({ value }) =>
            value.trim() ? undefined : "Name is required.",
        }}
      >
        {(field) => (
          <field.TextField
            accessibilityLabel="Name"
            autoCapitalize="words"
            label="Name"
            placeholder="Enter a name"
          />
        )}
      </form.AppField>

      <form.AppField
        name="quantity"
        validators={{
          onChange: ({ value }) => {
            const quantity = Number(value);
            return value &&
              Number.isInteger(quantity) &&
              quantity > 0
              ? undefined
              : "Enter a positive whole number.";
          },
        }}
      >
        {(field) => (
          <field.NumberField
            accessibilityLabel="Quantity"
            label="Quantity"
            placeholder="Enter a quantity"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton title="Add person" variant="primary" />
      </form.AppForm>

      <Container variant="section">
        <P variant="muted">People in alphabetical order</P>
        {sortedPeople.length === 0 ? (
          <P>No people added yet.</P>
        ) : (
          sortedPeople.map((person) => (
            <Container key={person.id} variant="card">
              {Array.from({ length: person.quantity }, () => person.name).map(
                (name, index) => (
                  <P key={`${person.id}-${index}`}>{name}</P>
                ),
              )}
            </Container>
          ))
        )}
      </Container>
      </ScrollView>
    </Container>
  );
}
