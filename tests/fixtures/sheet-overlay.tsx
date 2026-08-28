import { render, screen, waitFor } from '@testing-library/react';
import type userEvent from '@testing-library/user-event';
import * as React from 'react';
import { expect } from 'vitest';

import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetStack,
} from '@/components/ui/floating-sheet';

export const OVERLAY_LABEL = 'Overlay body';

export function panels(): HTMLElement | null {
    return document.querySelector('[data-slot="floating-sheet-panels"]');
}

export function patchPointerApis(): void {
    window.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    Object.assign(window.HTMLElement.prototype, {
        hasPointerCapture: () => false,
        setPointerCapture: () => undefined,
        releasePointerCapture: () => undefined,
        scrollIntoView: () => undefined,
    });
}

function SheetWith({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    return (
        <FloatingSheetStack>
            <button type="button" onClick={() => setOpen(true)}>
                Open sheet
            </button>

            <FloatingSheet open={open} onOpenChange={setOpen} title="Passenger">
                <FloatingSheetBody>{children}</FloatingSheetBody>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

export async function renderInSheet(
    user: ReturnType<typeof userEvent.setup>,
    children: React.ReactNode,
): Promise<void> {
    render(<SheetWith>{children}</SheetWith>);

    await user.click(screen.getByRole('button', { name: 'Open sheet' }));
    await waitFor(() => expect(panels()).not.toBeNull());
}
