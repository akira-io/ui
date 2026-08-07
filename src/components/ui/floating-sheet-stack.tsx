import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import {
    FloatingSheetStackContext,
    floatingSheetDefaultLabels,
    type FloatingSheetLabels,
    type FloatingSheetStackContextValue,
    type FloatingSheetStackEntry,
} from '@/components/ui/floating-sheet-context';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export function FloatingSheetStack({
    children,
    labels,
    slotName = 'floating-sheet-stack',
}: {
    children: React.ReactNode;
    labels?: Partial<FloatingSheetLabels>;
} & SlotNameProps) {
    const { backLabel, closeLabel } = useUiLabels(
        'floatingSheet',
        floatingSheetDefaultLabels,
        labels,
    );
    const [entries, setEntries] = React.useState<FloatingSheetStackEntry[]>([]);
    const [container, setContainer] = React.useState<HTMLElement | null>(null);

    const register = React.useCallback((entry: FloatingSheetStackEntry) => {
        setEntries((current) =>
            current.some((item) => item.id === entry.id)
                ? current.map((item) => (item.id === entry.id ? entry : item))
                : [...current, entry],
        );
    }, []);

    const unregister = React.useCallback((id: string) => {
        setEntries((current) => current.filter((item) => item.id !== id));
    }, []);

    const closeAll = React.useCallback(() => {
        for (const entry of [...entries].reverse()) {
            entry.close();
        }
    }, [entries]);

    const value = React.useMemo<FloatingSheetStackContextValue>(
        () => ({
            labels: { backLabel, closeLabel },
            container,
            entries,
            register,
            unregister,
            closeAll,
        }),
        [
            backLabel,
            closeLabel,
            container,
            entries,
            register,
            unregister,
            closeAll,
        ],
    );

    const top = entries.at(-1);

    return (
        <FloatingSheetStackContext.Provider value={value}>
            {children}

            <DialogPrimitive.Root
                open={entries.length > 0}
                onOpenChange={(open) => {
                    if (!open) {
                        closeAll();
                    }
                }}
            >
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay
                        data-slot="floating-sheet-overlay"
                        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/60 backdrop-blur-sm fixed z-50"
                    />
                    <DialogPrimitive.Content
                        aria-describedby={undefined}
                        onEscapeKeyDown={(event) => {
                            event.preventDefault();

                            if (!top?.persistent) {
                                top?.close();
                            }
                        }}
                        onInteractOutside={(event) => {
                            if (top?.persistent) {
                                event.preventDefault();
                            }
                        }}
                        onOpenAutoFocus={(event) => event.preventDefault()}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                        className="inset-y-0 right-0 sm:inset-y-4 sm:right-4 sm:w-[calc(100vw-2rem)] sm:max-w-lg fixed z-50 w-full outline-none"
                        data-slot={slotName}
                    >
                        <DialogPrimitive.Title className="sr-only">
                            {top?.title}
                        </DialogPrimitive.Title>
                        <div
                            ref={setContainer}
                            data-slot="floating-sheet-panels"
                            className="relative h-full w-full"
                        />
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </FloatingSheetStackContext.Provider>
    );
}
