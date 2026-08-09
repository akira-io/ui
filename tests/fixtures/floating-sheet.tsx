import * as React from 'react';

import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetFooter,
    FloatingSheetStack,
    type FloatingSheetLabels,
} from '@/components/ui/floating-sheet';
import { Separator } from '@/components/ui/separator';

export function TwoLevels({
    labels,
    inlineCallbacks = false,
}: {
    labels?: FloatingSheetLabels;
    inlineCallbacks?: boolean;
}) {
    const [clusterOpen, setClusterOpen] = React.useState(false);
    const [tasksOpen, setTasksOpen] = React.useState(false);
    const [ticks, setTicks] = React.useState(0);

    return (
        <FloatingSheetStack labels={labels}>
            <button type="button" onClick={() => setClusterOpen(true)}>
                Open cluster
            </button>

            <FloatingSheet
                open={clusterOpen}
                onOpenChange={
                    inlineCallbacks
                        ? (next) => setClusterOpen(next)
                        : setClusterOpen
                }
                title="App cluster settings"
                description="Serves incoming traffic"
            >
                <FloatingSheetBody>
                    <button type="button" onClick={() => setTasksOpen(true)}>
                        Open tasks
                    </button>

                    <FloatingSheet
                        open={tasksOpen}
                        onOpenChange={
                            inlineCallbacks
                                ? (next) => setTasksOpen(next)
                                : setTasksOpen
                        }
                        title="Scheduled tasks"
                    >
                        <FloatingSheetBody>
                            <button
                                type="button"
                                onClick={() => setTicks(ticks + 1)}
                            >
                                Re-render
                            </button>
                        </FloatingSheetBody>
                    </FloatingSheet>
                </FloatingSheetBody>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

export function DividedSheet({ divided = true }: { divided?: boolean }) {
    return (
        <FloatingSheetStack>
            <FloatingSheet open onOpenChange={() => {}} title="Edit passenger">
                <FloatingSheetBody>Fields</FloatingSheetBody>
                {divided ? <Separator /> : null}
                <FloatingSheetFooter>Actions</FloatingSheetFooter>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

export function ScrollableSheet({ hasBody = true }: { hasBody?: boolean }) {
    return (
        <FloatingSheetStack>
            <FloatingSheet open onOpenChange={() => {}} title="Trip details">
                {hasBody ? (
                    <FloatingSheetBody>
                        <p>Fare breakdown</p>
                        <p>Passenger notes</p>
                    </FloatingSheetBody>
                ) : null}
                <FloatingSheetFooter>Actions</FloatingSheetFooter>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

export function sheetPart(name: string): HTMLElement {
    const part = document.querySelector<HTMLElement>(
        `[data-slot="floating-sheet-${name}"]`,
    );

    if (!part) {
        throw new Error(`the sheet renders no ${name}`);
    }

    return part;
}

export function panels(): HTMLElement[] {
    return Array.from(
        document.querySelectorAll<HTMLElement>('[data-slot="floating-sheet"]'),
    );
}

export function panelTitles(): (string | null)[] {
    return Array.from(
        document.querySelectorAll('[data-slot="floating-sheet-title"]'),
    ).map((title) => title.textContent);
}
