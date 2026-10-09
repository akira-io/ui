// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createPortal } from 'react-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ActionMorph, ActionMorphAction } from '@/components/ui/action-morph';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

afterEach(cleanup);

const trigger = (name = 'New') => screen.getByRole('button', { name });

function PortalForm() {
    return (
        <ActionMorph label="New" icon={<span>+</span>}>
            <ActionMorphAction
                id="note"
                label="Quick note"
                onSelect={() => {}}
            />
            <ActionMorphAction id="task" label="Task">
                {() => (
                    <div>
                        <input aria-label="Title" />
                        {createPortal(<button>Option</button>, document.body)}
                    </div>
                )}
            </ActionMorphAction>
        </ActionMorph>
    );
}

describe('ActionMorph on awkward input', () => {
    it('keeps the form open when a portal inside it is used', async () => {
        const user = userEvent.setup();
        render(<PortalForm />);

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Task' }));
        await user.click(screen.getByText('Option'));

        expect(screen.getByRole('dialog', { name: 'Task' })).toBeTruthy();

        screen.getByText('Option').focus();
        await user.keyboard('{Escape}');

        expect(screen.getByRole('dialog', { name: 'Task' })).toBeTruthy();
    });

    it('runs a single direct action once however often it is pressed', async () => {
        const user = userEvent.setup();
        let finish = () => {};
        const onSelect = vi.fn(
            () =>
                new Promise<void>((done) => {
                    finish = done;
                }),
        );
        render(
            <ActionMorph label="Sync" icon={<span>~</span>}>
                <ActionMorphAction id="sync" label="Sync" onSelect={onSelect} />
            </ActionMorph>,
        );

        await user.click(trigger('Sync'));
        await user.click(trigger('Sync'));

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(trigger('Sync').getAttribute('aria-busy')).toBe('true');
        expect(trigger('Sync').getAttribute('aria-haspopup')).toBeNull();

        finish();
        await waitFor(() =>
            expect(screen.getByRole('status').textContent).toBe('Done'),
        );
    });

    it('hands focus back to the button when an action succeeds', async () => {
        const user = userEvent.setup();
        render(<PortalForm />);

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Quick note' }));

        await waitFor(() => expect(document.activeElement).toBe(trigger()));
    });

    it('collapses when focus tabs out of the surface', async () => {
        const user = userEvent.setup();
        render(
            <>
                <ActionMorph label="New" icon={<span>+</span>}>
                    <ActionMorphAction
                        id="note"
                        label="Quick note"
                        onSelect={() => {}}
                    />
                    <ActionMorphAction
                        id="pin"
                        label="Pin page"
                        onSelect={() => {}}
                    />
                </ActionMorph>
                <button>After</button>
            </>,
        );

        await user.click(trigger());
        await user.tab();

        expect(screen.queryByRole('menu')).toBeNull();
    });

    it('keeps one menu item in the tab order and chooses with enter and space', async () => {
        const user = userEvent.setup();
        const onPin = vi.fn();
        render(
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
                <ActionMorphAction id="pin" label="Pin page" onSelect={onPin} />
            </ActionMorph>,
        );

        await user.click(trigger());

        const tabbable = screen
            .getAllByRole('menuitem')
            .filter((item) => item.tabIndex === 0);

        expect(tabbable).toHaveLength(1);
        expect(trigger().getAttribute('aria-haspopup')).toBe('menu');

        await user.keyboard('{ArrowDown}');
        expect(
            screen.getByRole('menuitem', { name: 'Pin page' }).tabIndex,
        ).toBe(0);
        await user.keyboard(' ');

        expect(onPin).toHaveBeenCalledTimes(1);
    });

    it('reads actions wrapped in a fragment', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New" icon={<span>+</span>}>
                <>
                    <ActionMorphAction
                        id="note"
                        label="Quick note"
                        onSelect={() => {}}
                    />
                    <ActionMorphAction
                        id="pin"
                        label="Pin page"
                        onSelect={() => {}}
                    />
                </>
            </ActionMorph>,
        );

        await user.click(trigger());

        expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });

    it('collapses when the open form loses its action', async () => {
        const user = userEvent.setup();
        const morph = (withTask: boolean) => (
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
                {withTask ? (
                    <ActionMorphAction id="task" label="Task">
                        {() => <input aria-label="Title" />}
                    </ActionMorphAction>
                ) : null}
            </ActionMorph>
        );
        const { rerender } = render(morph(true));

        await user.click(trigger());
        await user.click(screen.getByRole('menuitem', { name: 'Task' }));
        rerender(morph(false));

        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        expect(trigger().getAttribute('aria-expanded')).not.toBe('true');
    });

    it('focuses the first field that can take focus', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New task" icon={<span>+</span>}>
                <ActionMorphAction id="task" label="Task">
                    {() => (
                        <div>
                            <input type="hidden" name="token" />
                            <input aria-label="Locked" disabled />
                            <input aria-label="Title" />
                        </div>
                    )}
                </ActionMorphAction>
            </ActionMorph>,
        );

        await user.click(trigger('New task'));

        expect(document.activeElement).toBe(screen.getByLabelText('Title'));
    });

    it('anchors the surface to the corner it is told', () => {
        render(
            <ActionMorph
                label="New"
                icon={<span>+</span>}
                side="top"
                align="start"
            >
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
            </ActionMorph>,
        );

        const surface = document.querySelector(
            '[data-slot="action-morph-surface"]',
        );

        expect(surface?.className).toContain('bottom-0');
        expect(surface?.className).toContain('left-0');
    });

    it('takes its labels from the locale provider and draws the check', async () => {
        const user = userEvent.setup();
        render(
            <UiLocaleProvider labels={ptLabels}>
                <ActionMorph label="Nova tarefa" icon={<span>+</span>}>
                    <ActionMorphAction id="task" label="Tarefa">
                        {({ complete }) => (
                            <button onClick={complete}>Guardar</button>
                        )}
                    </ActionMorphAction>
                </ActionMorph>
            </UiLocaleProvider>,
        );

        await user.click(trigger('Nova tarefa'));
        expect(screen.getByRole('button', { name: 'Fechar' })).toBeTruthy();

        await user.click(screen.getByText('Guardar'));

        expect(screen.getByRole('status').textContent).toBe('Feito');
        expect(
            document.querySelector('[data-slot="action-morph-check"]'),
        ).not.toBeNull();
    });
});
