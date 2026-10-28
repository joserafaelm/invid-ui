# Forms

`@invid/ui/form-fields` gives you a form hook with ready-made fields: label,
helper text, error message, and accessibility are handled for you. It is built
on [TanStack Form](https://tanstack.com/form), so its validation and
composition guides apply as written; this page covers what is specific to
`@invid/ui`.

## Install

```sh
npx expo install @tanstack/react-form zod
```

Validation works with any [Standard Schema](https://standardschema.dev)
library (Zod, Valibot, ArkType) or with plain functions. The examples use
Zod 4.

## A complete form

```tsx
import { useAppForm } from "@invid/ui/form-fields";
import { z } from "zod";

const SEATING = [
  { label: "Indoor", value: "indoor" },
  { label: "Terrace", value: "terrace" },
] as const;

const reservationSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  guests: z.number({ error: "Enter a number." }).int().min(1, "At least 1 guest."),
  seating: z.enum(["indoor", "terrace"], { error: "Choose where to sit." }),
});

type Reservation = z.output<typeof reservationSchema>;

type ReservationValues = {
  name: string;
  guests: number | undefined;
  seating: Reservation["seating"] | undefined;
};

const DEFAULTS: ReservationValues = {
  name: "",
  guests: 2,
  seating: undefined,
};

export function ReservationForm({
  onReserve,
}: {
  onReserve: (reservation: Reservation) => void;
}) {
  const form = useAppForm({
    defaultValues: DEFAULTS,
    validators: { onChange: reservationSchema },
    onSubmit: ({ value }) => onReserve(reservationSchema.parse(value)),
  });

  return (
    <form.AppForm>
      <form.AppField name="name">
        {(field) => <field.TextField label="Name" />}
      </form.AppField>
      <form.AppField name="guests">
        {(field) => <field.NumberField label="Guests" />}
      </form.AppField>
      <form.AppField name="seating">
        {(field) => <field.RadioGroupField label="Seating" options={SEATING} />}
      </form.AppField>
      <form.SubmitButton title="Reserve" variant="primary" />
    </form.AppForm>
  );
}
```

Four rules make this work:

1. **Wrap every form in `form.AppForm`.** It renders nothing; it gives
   `form.SubmitButton` (and any form component you add) access to the form.
   Fields work without it, but `form.SubmitButton` throws outside it.
2. **Give `defaultValues` the type the fields hold.** The schema's input type
   must fit the form values, or `validators` is a type error. Empty fields are
   `""` for text and `undefined` for numbers and choices, so declare the
   defaults type yourself when a field starts empty, as above. When every field
   starts with a value, `const DEFAULTS: z.input<typeof schema> = { ... }` is
   enough.
3. **Parse in `onSubmit` when the schema changes values.** `onSubmit` receives
   the raw form values: strings are not trimmed, and fields that started empty
   are still typed as possibly `undefined`. `schema.parse(value)` returns the
   schema's output type. When the schema changes nothing and no field can be
   empty, `value` can be used directly.
4. **Write defaults as a plain object, not with the schema's `.default()`.**
   `.default(2)` means "if the field is empty, use 2", not "start the field at
   2": a user who clears the field passes validation and silently submits 2.
   Use `.default()` only for fields where that fallback is what you want.

## Fields

Every field takes `label` (required) and `description` (helper text under the
control), plus the props of the control it renders. The field owns `value`,
the change and blur callbacks, and `invalid`.

| Field | Form value | Control props |
| --- | --- | --- |
| `field.TextField` | `string` | `TextInput` props, such as `placeholder`, `autoComplete`, `secureTextEntry` |
| `field.TextAreaField` | `string` | `TextArea` props, such as `maxLength` |
| `field.NumberField` | `number \| undefined` | `NumberInput` props |
| `field.PhoneField` | `string` | `PhoneInput` props |
| `field.SelectField` | `string \| undefined` | `options` (required), `placeholder`, `disabled` |
| `field.RadioGroupField` | `string \| undefined` | `options` (required), `disabled` |

Options are `{ label: string; value: string; disabled?: boolean }`. The form
value is the selected option's `value`.

`NumberField` keeps what the user is typing, such as `-` or `1.`, while the
form value holds the parsed number, or `undefined` while the text is empty or
not a number yet. Validate the number in the schema, for example
`z.number({ error: "Enter a number." }).int().min(1)`.

A field whose form value has the wrong type throws when it renders, naming
the field and the type it needs. For example, `field.TextField` on a number
throws instead of turning the number into text.

## Validation and errors

- **When errors show.** A field shows its error after the user leaves it or
  presses the submit button, then updates as the value changes. Errors do not
  appear while someone is still typing for the first time.
- **What you can return.** Schema issues show their `message`. Function
  validators return a string, or `undefined` when valid. Anything else throws,
  so a validator that returns an object you meant to use elsewhere fails
  loudly instead of showing nothing.
- **Where to validate.** A schema on the form (`validators` in `useAppForm`)
  validates every field at once. A validator on one field goes on
  `form.AppField`:

  ```tsx
  <form.AppField
    name="username"
    validators={{
      onChange: z.string().min(3, "Use at least 3 characters."),
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: checkUsernameAvailable,
    }}
  >
    {(field) => <field.TextField label="Username" />}
  </form.AppField>
  ```

  See TanStack's
  [validation guide](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
  for blur, submit, async, and linked-field validation.
- **Accessibility.** The error is shown as text in the danger color, and the
  control gets a danger border. The message is added to the control's
  accessibility hint, so screen readers read it with the focused input, and
  Android announces it when it appears.

## Submitting

`form.SubmitButton` calls the form's submit and takes `Button` props, such as
`title` (default `"Submit"`) and `variant`. While `onSubmit` runs, including an
async `onSubmit`, the button is disabled and reported as busy to screen
readers, so it cannot submit twice. Invalid forms can still be submitted:
submitting shows every field's error and does not call `onSubmit`.

## Splitting and reusing forms

These come from TanStack Form's
[form composition guide](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition).

### Sections of one form: `withForm`

Share the form options between the form and its sections with `formOptions`:

```tsx
import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@invid/ui/form-fields";

const profileOptions = formOptions({
  defaultValues: { name: "", phone: "" },
});

const ContactSection = withForm({
  ...profileOptions,
  props: { title: "Contact" },
  render: function Render({ form }) {
    return (
      <form.AppField name="phone">
        {(field) => <field.PhoneField label="Phone" />}
      </form.AppField>
    );
  },
});

function ProfileForm() {
  const form = useAppForm({ ...profileOptions, onSubmit: save });

  return (
    <form.AppForm>
      <form.AppField name="name">
        {(field) => <field.TextField label="Name" />}
      </form.AppField>
      <ContactSection form={form} title="Contact" />
      <form.SubmitButton />
    </form.AppForm>
  );
}
```

### The same fields in several forms: `withFieldGroup`

```tsx
import { withFieldGroup } from "@invid/ui/form-fields";

const PasswordFields = withFieldGroup({
  defaultValues: { password: "", confirmPassword: "" },
  render: function Render({ group }) {
    return (
      <>
        <group.AppField name="password">
          {(field) => <field.TextField label="Password" secureTextEntry />}
        </group.AppField>
        <group.AppField name="confirmPassword">
          {(field) => (
            <field.TextField label="Confirm password" secureTextEntry />
          )}
        </group.AppField>
      </>
    );
  },
});

<PasswordFields
  fields={{ password: "password", confirmPassword: "confirmPassword" }}
  form={form}
/>;
```

### Your own fields: `extendForm`

Build a field with `FormField` and `useFieldContext` from
`@invid/ui/form-field`, register it once with `extendForm`, and import the
form hook from that file everywhere in the app:

```tsx
// src/forms/app-form.tsx
import { FormField, useFieldContext } from "@invid/ui/form-field";
import { extendForm } from "@invid/ui/form-fields";
import { RadioGroup } from "@invid/ui/radio-group";

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

function YesNoField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  const value = field.state.value ? "yes" : "no";

  function handleValueChange(nextValue: string) {
    field.handleChange(nextValue === "yes");
    field.handleBlur();
  }

  return (
    <FormField label={label}>
      <RadioGroup
        accessibilityLabel={label}
        onValueChange={handleValueChange}
        options={YES_NO}
        value={value}
      />
    </FormField>
  );
}

export const { useAppForm, withForm, withFieldGroup } = extendForm({
  fieldComponents: { YesNoField },
});
```

`FormField` lays out the label, your control, the description, and the error,
and decides when the error shows. If your control needs the message too, for
example to mark itself invalid, call `useFieldError()`. Form components, such
as a reset button, use `useFormContext()` and go in `formComponents`.

After you extend the hook, create `withForm` and `withFieldGroup` from the
extended hook too. A section made with the base hook does not accept a form
made with the extended one.

## Troubleshooting

| Error | Fix |
| --- | --- |
| `form.SubmitButton must be rendered inside <form.AppForm>` | Wrap the whole form in `<form.AppForm>`. |
| `field.NumberField for "…" needs a number or undefined` | That field's `defaultValues` entry has another type. Fix the default, or use the field component that matches the value. |
| `the validation error for field "…" is not text` | Return a string from the validator, or use a schema whose issues have a `message`. |
| `validators` is a type error | The schema's input type does not match the form values. Compare it with the type of `defaultValues`. |
