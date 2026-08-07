import { SaveStatus } from '@/components/ui/save-status';
import { useAutosave, type UseAutosaveOptions } from '@/hooks/use-autosave';
import * as React from 'react';

export interface AutosaveValues {
    name: string;
    seats: number | '';
}

export const INITIAL_VALUES: AutosaveValues = { name: 'Cascais', seats: 40 };

export function AutosaveForm({
    onSave,
    options,
}: {
    onSave: (values: AutosaveValues) => void | Promise<void>;
    options?: UseAutosaveOptions<AutosaveValues>;
}) {
    const [values, setValues] = React.useState<AutosaveValues>(INITIAL_VALUES);
    const { status, error } = useAutosave(values, onSave, options);

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                value={values.name}
                onChange={(event) =>
                    setValues((current) => ({
                        ...current,
                        name: event.target.value,
                    }))
                }
            />
            <SaveStatus status={status} message={error} showIdle />
        </form>
    );
}
