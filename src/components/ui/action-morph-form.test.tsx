// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { ActionMorph, ActionMorphAction } from '@/components/ui/action-morph';

afterEach(cleanup);

const taskForm = (
    <ActionMorphAction id="task" label="Task">
        {({ complete, back }) => (
            <div className="p-4">
                <input aria-label="Title" />
                <button onClick={complete}>Save</button>
                <button onClick={back}>Cancel</button>
            </div>
        )}
    </ActionMorphAction>
);

describe('an ActionMorph form', () => {
    it('opens the form of the chosen action with focus in its first field', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
                {taskForm}
            </ActionMorph>,
        );

        await user.click(screen.getByRole('button', { name: 'New' }));
        await user.click(screen.getByRole('menuitem', { name: 'Task' }));

        expect(screen.getByRole('dialog', { name: 'Task' })).toBeTruthy();
        expect(document.activeElement).toBe(screen.getByLabelText('Title'));
    });

    it('returns to the menu on back and on escape, then collapses', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
                {taskForm}
            </ActionMorph>,
        );

        await user.click(screen.getByRole('button', { name: 'New' }));
        await user.click(screen.getByRole('menuitem', { name: 'Task' }));
        await user.click(screen.getByText('Cancel'));
        expect(screen.getByRole('menu')).toBeTruthy();

        await user.click(screen.getByRole('menuitem', { name: 'Task' }));
        await user.keyboard('{Escape}');
        expect(screen.getByRole('menu')).toBeTruthy();
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('menu')).toBeNull();
    });

    it('shows the check when the form completes', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New" icon={<span>+</span>}>
                <ActionMorphAction
                    id="note"
                    label="Quick note"
                    onSelect={() => {}}
                />
                {taskForm}
            </ActionMorph>,
        );

        await user.click(screen.getByRole('button', { name: 'New' }));
        await user.click(screen.getByRole('menuitem', { name: 'Task' }));
        await user.click(screen.getByText('Save'));

        expect(screen.getByRole('status').textContent).toBe('Done');
    });

    it('opens a single action straight into its form and collapses on escape', async () => {
        const user = userEvent.setup();
        render(
            <ActionMorph label="New task" icon={<span>+</span>}>
                {taskForm}
            </ActionMorph>,
        );

        const trigger = screen.getByRole('button', { name: 'New task' });

        expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');

        await user.click(trigger);
        expect(screen.queryByRole('menu')).toBeNull();
        expect(screen.getByRole('dialog', { name: 'Task' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();

        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(document.activeElement).toBe(
            screen.getByRole('button', { name: 'New task' }),
        );
    });
});
