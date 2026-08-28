import * as React from 'react';

import { FloatingSheetStackContext } from '@/components/ui/floating-sheet-context';

export function useSheetPortalContainer(
    container?: HTMLElement | null,
): HTMLElement | undefined {
    const stack = React.useContext(FloatingSheetStackContext);

    return container ?? stack?.container ?? undefined;
}
