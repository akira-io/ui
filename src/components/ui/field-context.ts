import * as React from 'react';

export type FieldOrientation = 'vertical' | 'horizontal';

export interface FieldContextValue {
    controlId: string;
    descriptionId: string;
    errorId: string;
    orientation: FieldOrientation;
    invalid: boolean;
    required: boolean;
    hasDescription: boolean;
    setHasDescription: (present: boolean) => void;
}

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export function useOptionalField(): FieldContextValue | null {
    return React.useContext(FieldContext);
}

export function useField(): FieldContextValue {
    const field = useOptionalField();

    if (!field) {
        throw new Error('Field parts must be rendered inside a Field.');
    }

    return field;
}
