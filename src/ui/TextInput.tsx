import React from 'react';
import { TextInput as InvTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

export type TextInputVariant = 'default' | 'lead' | 'muted';

type NativeTextInputProps = React.ComponentProps<typeof InvTextInput>;

export type TextInputProps = Omit<
    NativeTextInputProps,
    'className' | 'children'
> & {
    variant?: TextInputVariant;
    style?: NativeTextInputProps['style'];
};

const TEXT_INPUT_VARIANT_STYLES = {
    default: 'rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base leading-6 text-foreground',
    lead: 'rounded-xl border border-blue-500 bg-blue-50 px-4 py-3 text-lg leading-7 text-foreground',
    muted: 'rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-base leading-6 text-muted-foreground',
} as const satisfies Record<TextInputVariant, string>;

export function TextInput({ variant, style, ...textInputProps }: TextInputProps) {
    const textInputVariants = tv({
        variants: {
            variant: TEXT_INPUT_VARIANT_STYLES,
        },
        defaultVariants: {
            variant: 'default',
        },
    });
    const className = textInputVariants({ variant });
    const unifiedTextInputProps = { ...textInputProps, className, style };

    return <InvTextInput {...unifiedTextInputProps} />;
}

 