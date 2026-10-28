import { Container } from "@invid/ui/container";
import { P } from "@invid/ui/p";
import type { SelectOption } from "@invid/ui/select";
import { Select } from "@invid/ui/select";
import { useState } from "react";
import { ScrollView } from "react-native";

const COUNTRIES = [
  { label: "Argentina", value: "ar" },
  { label: "Brazil", value: "br" },
  { label: "Canada", value: "ca" },
  { label: "Chile", value: "cl" },
  { label: "Colombia", value: "co" },
  { label: "Costa Rica", value: "cr" },
  { label: "Dominican Republic", value: "do" },
  { label: "Ecuador", value: "ec" },
  { label: "France", value: "fr" },
  { label: "Germany", value: "de" },
  { label: "Guatemala", value: "gt" },
  { label: "Mexico", value: "mx" },
  { label: "Panama", value: "pa" },
  { label: "Peru", value: "pe" },
  { label: "Portugal", value: "pt" },
  { label: "Spain", value: "es" },
  { label: "United States", value: "us" },
  { label: "Uruguay", value: "uy" },
] as const satisfies readonly SelectOption[];

const SIZES = [
  { label: "Small", value: "s" },
  { label: "Medium", value: "m" },
  { label: "Large (sold out)", value: "l", disabled: true },
] as const satisfies readonly SelectOption[];

export default function SelectRoute() {
  const [country, setCountry] = useState<string>();
  const [size, setSize] = useState<string>();
  const countryLabel =
    COUNTRIES.find((option) => option.value === country)?.label ??
    "No country selected yet";

  return (
    <ScrollView>
      <Container variant="screen">
        <Container variant="section">
          <P variant="lead">Select tester</P>
          <P variant="muted">
            Tap a field to choose from a list. Long lists scroll inside the
            dialog.
          </P>
        </Container>

        <Container variant="section">
          <P variant="label">Country</P>
          <Select
            accessibilityLabel="Country"
            onValueChange={setCountry}
            options={COUNTRIES}
            placeholder="Choose a country"
            value={country}
          />
          <P variant="muted">{countryLabel}</P>
        </Container>

        <Container variant="section">
          <P variant="label">Size, with a disabled option</P>
          <Select
            accessibilityLabel="Size"
            onValueChange={setSize}
            options={SIZES}
            value={size}
          />
        </Container>

        <Container variant="section">
          <P variant="label">Invalid</P>
          <Select
            accessibilityLabel="Invalid select"
            invalid={true}
            onValueChange={setSize}
            options={SIZES}
            value={undefined}
          />
          <P variant="danger">Choose a size.</P>
        </Container>

        <Container variant="section">
          <P variant="label">Disabled</P>
          <Select
            accessibilityLabel="Disabled select"
            disabled={true}
            onValueChange={setSize}
            options={SIZES}
            value="m"
          />
        </Container>
      </Container>
    </ScrollView>
  );
}
