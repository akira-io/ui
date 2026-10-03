// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    CommandDialog,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

beforeAll(() => {
    Object.assign(window.HTMLElement.prototype, {
        scrollIntoView: () => undefined,
    });
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

afterEach(cleanup);

function Palette(props: React.ComponentProps<typeof CommandDialog>) {
    return (
        <CommandDialog open {...props}>
            <CommandInput placeholder="Search" />
            <CommandList>
                <CommandItem value="Listas">Listas</CommandItem>
                <CommandItem value="Adira Santos">Adira Santos</CommandItem>
            </CommandList>
        </CommandDialog>
    );
}

function commandRoot(): HTMLElement | null {
    return document.querySelector('[data-slot="command"]');
}

function selectedItem(): string | null | undefined {
    return document.querySelector('[cmdk-item][aria-selected="true"]')
        ?.textContent;
}

describe('CommandDialog commandProps', () => {
    it('filters items by the query when no command props are given', async () => {
        render(<Palette />);

        await userEvent.type(screen.getByPlaceholderText('Search'), 'adira');

        expect(screen.queryByText('Listas')).toBeNull();
        expect(screen.getByText('Adira Santos')).toBeTruthy();
    });

    it('forwards shouldFilter to the inner command', async () => {
        render(<Palette commandProps={{ shouldFilter: false }} />);

        await userEvent.type(screen.getByPlaceholderText('Search'), 'adira');

        expect(screen.getByText('Listas')).toBeTruthy();
        expect(screen.getByText('Adira Santos')).toBeTruthy();
    });

    it('forwards a controlled value and reports changes through onValueChange', async () => {
        function Controlled() {
            const [value, setValue] = React.useState('Adira Santos');

            return (
                <Palette commandProps={{ value, onValueChange: setValue }} />
            );
        }

        render(<Controlled />);

        expect(selectedItem()).toBe('Adira Santos');

        await userEvent.type(
            screen.getByPlaceholderText('Search'),
            '{ArrowUp}',
        );

        expect(selectedItem()).toBe('Listas');
    });

    it('merges a caller className with the dialog item spacing', () => {
        render(<Palette commandProps={{ className: 'caller-class' }} />);

        const root = commandRoot();

        expect(root?.className).toContain('caller-class');
        expect(root?.className).toContain('[&_[cmdk-item]]:py-2.5');
    });
});
