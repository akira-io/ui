import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence } from 'motion/react';
import * as React from 'react';

import {
    FloatingSheetStackContext,
    floatingSheetDefaultLabels,
    type FloatingSheetLabels,
    type FloatingSheetStackContextValue,
    type FloatingSheetStackEntry,
} from '@/components/ui/floating-sheet-context';
import { modalScrim } from '@/lib/language';
import { OverlayBackdrop } from '@/lib/motion/overlay-motion';
import { stackCloseStagger } from '@/lib/motion/tokens';
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

    const live = React.useMemo(
        () => entries.filter((entry) => !entry.leaving),
        [entries],
    );

    const liveRef = React.useRef(live);
    const cascade = React.useRef<number[]>([]);

    React.useLayoutEffect(() => {
        liveRef.current = live;
    });

    const stopCascade = React.useCallback(() => {
        cascade.current.forEach((timer) => window.clearTimeout(timer));
        cascade.current = [];
    }, []);

    React.useEffect(() => stopCascade, [stopCascade]);

    const closeAll = React.useCallback(() => {
        stopCascade();

        const order = [...live].reverse();
        const closing = new Set(order.map((entry) => entry.id));

        order.forEach((entry, step) => {
            if (step === 0) {
                entry.close();

                return;
            }

            const closeInTurn = () => {
                const current = liveRef.current;

                if (current.some((item) => !closing.has(item.id))) {
                    stopCascade();

                    return;
                }

                if (current.some((item) => item.id === entry.id)) {
                    entry.close();
                }
            };

            cascade.current.push(
                window.setTimeout(closeInTurn, step * stackCloseStagger),
            );
        });
    }, [live, stopCascade]);

    const value = React.useMemo<FloatingSheetStackContextValue>(
        () => ({
            labels: { backLabel, closeLabel },
            container,
            entries,
            live,
            register,
            unregister,
            closeAll,
        }),
        [
            backLabel,
            closeLabel,
            container,
            entries,
            live,
            register,
            unregister,
            closeAll,
        ],
    );

    const top = live.at(-1);

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
                    <AnimatePresence>
                        {live.length > 0 ? (
                            <DialogPrimitive.Overlay
                                key="overlay"
                                forceMount
                                asChild
                                data-slot="floating-sheet-overlay"
                                className={modalScrim}
                            >
                                <OverlayBackdrop />
                            </DialogPrimitive.Overlay>
                        ) : null}
                    </AnimatePresence>
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
                        className="inset-2 sm:inset-y-4 sm:right-4 sm:left-auto sm:w-[calc(100vw-2rem)] sm:max-w-lg sm:p-0 fixed z-50 p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)] outline-none"
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
