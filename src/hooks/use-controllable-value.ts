import { useState } from 'react';

export function useControllableValue<Value>(
    isControlled: boolean,
    value: Value | undefined,
    defaultValue: Value | undefined,
    onChange?: (next: Value | undefined) => void,
): [Value | undefined, (next: Value | undefined) => void] {
    const [ownValue, setOwnValue] = useState<Value | undefined>(defaultValue);

    function commit(next: Value | undefined): void {
        if (!isControlled) {
            setOwnValue(next);
        }

        onChange?.(next);
    }

    return [isControlled ? value : ownValue, commit];
}
