import * as React from 'react';

import type { SlotNameProps } from '@/types';

export type AkiraMarkProps = React.SVGProps<SVGSVGElement>;

function AkiraMark({
    slotName = 'akira-mark',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: AkiraMarkProps & SlotNameProps) {
    const isLabelled = ariaLabel !== undefined || ariaLabelledBy !== undefined;

    return (
        <svg
            viewBox="0 0 32.06 30.95"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-hidden={isLabelled ? undefined : true}
            role={isLabelled ? 'img' : undefined}
            data-slot={slotName}
        >
            <path d="M30.5,17.75,21.6,2.25h0a4.42,4.42,0,0,0-7.7,0L.4,25.85a3.29,3.29,0,0,0-.4,1.7A3.35,3.35,0,0,0,3.3,31a3.24,3.24,0,0,0,2.9-1.7l10.7-18.7a1,1,0,0,1,1.8,0l3.4,5.9a.88.88,0,0,1-.8,1.3H17.5a3.35,3.35,0,0,0-3.3,3.4h0a3.35,3.35,0,0,0,3.3,3.4H28.8a3.24,3.24,0,0,0,2.8-4.9Z" />
        </svg>
    );
}

export { AkiraMark };
