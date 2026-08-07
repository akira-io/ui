import { DateFilter } from '@/blocks/date-filter';
import type { DateFilterValue } from '@/blocks/date-filter/types';
import { Combobox } from '@/components/ui/combobox';
import { DataTable } from '@/components/ui/data-table';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useState } from 'react';

export function ComboboxHarness({ placeholder }: { placeholder?: string }) {
    return (
        <Combobox
            value=""
            options={[{ value: 'one', label: 'One' }]}
            onChange={() => undefined}
            placeholder={placeholder}
        />
    );
}

export function DataTableHarness() {
    return (
        <DataTable
            columns={[{ accessorKey: 'name', header: 'Name' }]}
            data={[]}
            searchKey="name"
        />
    );
}

export function DateFilterHarness({ value }: { value: DateFilterValue }) {
    return <DateFilter value={value} onChange={() => undefined} />;
}

export function ConfirmHarness() {
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const [confirmed, setConfirmed] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => confirm(() => setConfirmed(true))}
            >
                Ask
            </button>
            {confirmed && <p>done</p>}
            <ConfirmDialog />
        </>
    );
}
