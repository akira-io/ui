import { fieldFocus, fieldSurface, focusRing } from '@/lib/language';
import type { SlotNameProps } from '@/types';
import { X } from 'lucide-react';

export const pickerTriggerClasses = `h-11 px-4 font-medium flex w-full cursor-pointer items-center gap-2 text-left transition-all disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`;

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
            className={`size-7 rounded-xl right-2 absolute top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground ${focusRing}`}
        >
            <X className="size-3.5" />
        </button>
    );
}
