// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import {
    panels,
    panelTitles,
    TwoLevels,
} from '@/components/ui/__fixtures__/floating-sheet';

afterEach(cleanup);

function stackName(): string | null | undefined {
    const stack = document.querySelector<HTMLElement>(
        '[data-slot="floating-sheet-stack"]',
    );

    return document.getElementById(stack?.getAttribute('aria-labelledby') ?? '')
        ?.textContent;
}

describe('the floating sheet focus and labels', () => {
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

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );
        await waitFor(() => expect(panelTitles()).toContain('Scheduled tasks'));

        await user.click(screen.getByRole('button', { name: 'Back' }));

        await waitFor(() =>
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Open tasks' }),
            ),
        );
    });

    it('names the stack after the panel on top', async () => {
        const user = userEvent.setup();
        render(<TwoLevels />);

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));

        await waitFor(() => expect(stackName()).toBe('App cluster settings'));

        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );

        await waitFor(() => expect(stackName()).toBe('Scheduled tasks'));
    });

    it('carries the labels it is given', async () => {
        const user = userEvent.setup();
        render(
            <TwoLevels
                labels={{ backLabel: 'Voltar', closeLabel: 'Fechar' }}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Open cluster' }));
        await user.click(
            await screen.findByRole('button', { name: 'Open tasks' }),
        );

        expect(
            await screen.findByRole('button', { name: 'Voltar' }),
        ).toBeDefined();
        expect(screen.getAllByRole('button', { name: 'Fechar' }).length).toBe(
            2,
        );
    });
});
