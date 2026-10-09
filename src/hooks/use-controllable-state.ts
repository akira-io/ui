import * as React from 'react';

interface ControllableStateOptions<T> {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
}

export function useControllableState<T>({
    value,
    defaultValue,
    onChange,
}: ControllableStateOptions<T>): [T, (next: T) => void] {
    const [owned, setOwned] = React.useState(defaultValue);
    const isControlled = value !== undefined;

    const setValue = React.useCallback(
        (next: T) => {
            if (!isControlled) {
                setOwned(next);
            }

            onChange?.(next);
        },
        [isControlled, onChange],
    );

    return [isControlled ? value : owned, setValue];
}
