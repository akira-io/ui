import * as React from 'react';

import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetStack,
    type FloatingSheetLabels,
} from '@/components/ui/floating-sheet';

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
