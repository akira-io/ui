// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetStack,
} from '@/components/ui/floating-sheet';

afterEach(cleanup);

function TwoLevels() {
    const [clusterOpen, setClusterOpen] = React.useState(false);
    const [tasksOpen, setTasksOpen] = React.useState(false);

    return (
        <FloatingSheetStack>
            <button type="button" onClick={() => setClusterOpen(true)}>
                Open cluster
            </button>

            <FloatingSheet
                open={clusterOpen}
                onOpenChange={setClusterOpen}
                title="App cluster settings"
                description="Serves incoming traffic"
            >
                <FloatingSheetBody>
                    <button type="button" onClick={() => setTasksOpen(true)}>
                        Open tasks
                    </button>

                    <FloatingSheet
                        open={tasksOpen}
                        onOpenChange={setTasksOpen}
                        title="Scheduled tasks"
                    >
                        <FloatingSheetBody>One task</FloatingSheetBody>
                    </FloatingSheet>
                </FloatingSheetBody>
            </FloatingSheet>
        </FloatingSheetStack>
    );
}

async function openBothLevels(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'Open cluster' }));
    await user.click(await screen.findByRole('button', { name: 'Open tasks' }));

    await screen.findByText('Scheduled tasks');
}

function panels(): HTMLElement[] {
    return Array.from(
        document.querySelectorAll<HTMLElement>('[data-slot="floating-sheet"]'),
    );
}

describe('the floating sheet stack', () => {
    it('renders nothing until a panel opens', () => {
        render(<TwoLevels />);

        expect(panels()).toHaveLength(0);
        expect(
            document.querySelectorAll('[data-slot="floating-sheet-overlay"]'),
        ).toHaveLength(0);
    });

    it('keeps the panel below mounted when a second one opens', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(panels()).toHaveLength(2);
        expect(screen.getByText('App cluster settings')).toBeDefined();
    });

    it('renders a single overlay for the whole stack', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(
            document.querySelectorAll('[data-slot="floating-sheet-overlay"]'),
        ).toHaveLength(1);
    });

    it('leaves every panel below the top inert', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const [below, top] = panels();

        expect(below.hasAttribute('inert')).toBe(true);
        expect(top.hasAttribute('inert')).toBe(false);
    });

    it('offsets the panel below and leaves the top one in place', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const [below, top] = panels();

        expect(below.getAttribute('data-depth')).toBe('1');
        expect(below.style.transform).toContain('translateX(-26px)');
        expect(top.getAttribute('data-depth')).toBe('0');
        expect(top.style.transform).toContain('translateX(-0px)');
    });

    it('shows a back control on the panel above the first and none on the first', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        expect(
            document.querySelectorAll('[data-slot="floating-sheet-back"]'),
        ).toHaveLength(1);
    });

    it('pops one level when back is pressed', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        await user.click(screen.getByRole('button', { name: 'Back' }));

        await waitFor(() => expect(panels()).toHaveLength(1));
        expect(screen.getByText('App cluster settings')).toBeDefined();
        expect(screen.queryByText('Scheduled tasks')).toBeNull();
    });

    it('closes only the topmost panel on escape', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        await user.keyboard('{Escape}');

        await waitFor(() => expect(panels()).toHaveLength(1));
        expect(screen.getByText('App cluster settings')).toBeDefined();
    });

    it('dismisses the whole stack from the close control', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        const closeControls = screen.getAllByRole('button', { name: 'Close' });

        await user.click(closeControls[closeControls.length - 1]);

        await waitFor(() => expect(panels()).toHaveLength(0));
    });

    it('moves focus into the panel that just opened', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));

        await waitFor(() => expect(panels()).toHaveLength(1));
        await waitFor(() => expect(document.activeElement).toBe(panels()[0]));
    });

    it('returns focus to the control that opened the panel when it closes', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await openBothLevels(user);

        await user.click(screen.getByRole('button', { name: 'Back' }));

        await waitFor(() =>
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Open tasks' }),
            ),
        );
    });

    it('carries the labels it is given', async () => {
        function Localised() {
            const [open, setOpen] = React.useState(false);
            const [nested, setNested] = React.useState(false);

            return (
                <FloatingSheetStack
                    labels={{ backLabel: 'Voltar', closeLabel: 'Fechar' }}
                >
                    <button type="button" onClick={() => setOpen(true)}>
                        Abrir
                    </button>

                    <FloatingSheet
                        open={open}
                        onOpenChange={setOpen}
                        title="Definições"
                    >
                        <FloatingSheetBody>
                            <button
                                type="button"
                                onClick={() => setNested(true)}
                            >
                                Abrir tarefas
                            </button>

                            <FloatingSheet
                                open={nested}
                                onOpenChange={setNested}
                                title="Tarefas"
                            >
                                <FloatingSheetBody>
                                    Uma tarefa
                                </FloatingSheetBody>
                            </FloatingSheet>
                        </FloatingSheetBody>
                    </FloatingSheet>
                </FloatingSheetStack>
            );
        }

        const user = userEvent.setup();
        render(<Localised />);

        await user.click(screen.getByRole('button', { name: 'Abrir' }));
        await user.click(
            await screen.findByRole('button', { name: 'Abrir tarefas' }),
        );

        expect(
            await screen.findByRole('button', { name: 'Voltar' }),
        ).toBeDefined();
        expect(screen.getAllByRole('button', { name: 'Fechar' }).length).toBe(
            2,
        );
    });

    it('throws when a panel is used outside a stack', () => {
        expect(() =>
            render(
                <FloatingSheet open onOpenChange={() => {}} title="Alone">
                    <FloatingSheetBody>Body</FloatingSheetBody>
                </FloatingSheet>,
            ),
        ).toThrow(/FloatingSheetStack/);
    });
});
