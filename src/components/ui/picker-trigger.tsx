import { fieldFocus, fieldSurface, focusRing } from '@/lib/language';
import type { SlotNameProps } from '@/types';
import { X } from 'lucide-react';

export const pickerTriggerClasses = `h-control px-inset flex w-full items-center gap-item text-left transition-shadow disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`;

export function PickerClearButton({
    label,
    onClear,
    slotName = 'picker-clear',
}: {
    label: string;
    onClear: () => void;
} & SlotNameProps) {
    return (
        <button
            type="button"
            data-slot={slotName}
            aria-label={label}
            onClick={onClear}
            className={`size-7 rounded-xl right-2 absolute top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground ${focusRing}`}
        >
            <X className="size-icon-sm" />
        </button>
    );
}
