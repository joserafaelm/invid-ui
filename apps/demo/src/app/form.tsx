import { Container } from "@invid/ui/container";
import { useAppForm } from "@invid/ui/form-fields";
import { P } from "@invid/ui/p";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";

type Person = {
  id: number;
  name: string;
  quantity: number;
};

const MAX_QUANTITY = 20;
const NAME_REQUIRED = "Name is required.";
const QUANTITY_INVALID = `Enter a whole number from 1 to ${MAX_QUANTITY}.`;

function validateName({ value }: { value: string }) {
  return value.trim() ? undefined : NAME_REQUIRED;
}

function validateQuantity({ value }: { value: string }) {
  const quantity = Number(value);
  const isValid =
    value !== "" &&
    Number.isInteger(quantity) &&
    quantity >= 1 &&
    quantity <= MAX_QUANTITY;

  return isValid ? undefined : QUANTITY_INVALID;
}

function PersonCard({ person }: { person: Person }) {
  const copies = Array.from(
    { length: person.quantity },
    (_, copy) => `${person.id}-${copy}`,
  );
  const names = copies.map((copyKey) => <P key={copyKey}>{person.name}</P>);

  return <Container variant="card">{names}</Container>;
}

export default function FormRoute() {
  const [people, setPeople] = useState<Person[]>([]);
  const nextPersonId = useRef(0);
  const form = useAppForm({
    defaultValues: {
      name: "",
      quantity: "",
    },
    onSubmit: ({ value }) => {
      const person = {
        id: nextPersonId.current,
        name: value.name.trim(),
        quantity: Number(value.quantity),
      };
      nextPersonId.current += 1;
      setPeople((currentPeople) => [...currentPeople, person]);
      form.reset();
    },
  });
  const sortedPeople = [...people].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
  const peopleList =
    sortedPeople.length === 0 ? (
      <P>No people added yet.</P>
    ) : (
      sortedPeople.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))
    );

  return (
    <ScrollView>
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">People</P>
          <P variant="muted">
            Add people with a repeat count. The list is kept in alphabetical
            order.
          </P>
        </Container>

        <form.AppField name="name" validators={{ onChange: validateName }}>
          {(field) => (
            <field.TextField
              autoCapitalize="words"
              label="Name"
              placeholder="Enter a name"
            />
          )}
        </form.AppField>

        <form.AppField
          name="quantity"
          validators={{ onChange: validateQuantity }}
        >
          {(field) => (
            <field.NumberField
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
          {peopleList}
        </Container>
      </Container>
    </ScrollView>
  );
}
