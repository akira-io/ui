/** @vitest-environment jsdom */

import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './select';

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe('the dropdown menu', () => {
    it('opens over its button and grows out of it', async () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>More</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );
        const trigger = document.querySelector<HTMLElement>(
            '[data-slot="dropdown-menu-trigger"]',
        )!;

        trigger.focus();
        await userEvent.keyboard('{Enter}');

        const content = document.querySelector(
            '[data-slot="dropdown-menu-content"]',
        )!;

        expect(content.hasAttribute('data-morph-surface')).toBe(true);
        expect(content.className).toContain(
            'data-[side=bottom]:-translate-y-(--radix-dropdown-menu-trigger-height)',
        );
    });
});

describe('opening the dropdown over its button', () => {
    it('does not choose the item under the pointer when the opening click is released', async () => {
        const onSelect = vi.fn();

        vi.spyOn(performance, 'now').mockReturnValue(1000);
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>More</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={onSelect}>
                        Share
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );
        const trigger = document.querySelector<HTMLElement>(
            '[data-slot="dropdown-menu-trigger"]',
        )!;

        trigger.focus();
        await userEvent.keyboard('{Enter}');
        const item = document.querySelector<HTMLElement>(
            '[data-slot="dropdown-menu-item"]',
        )!;

        fireEvent.pointerMove(item, { pointerType: 'mouse' });
        fireEvent.pointerUp(item, { pointerType: 'mouse', button: 0 });
        fireEvent.click(item, { detail: 1 });

        expect(onSelect).not.toHaveBeenCalled();
    });
});

describe('the pop-up', () => {
    it('marks the pop-up with the double chevron', () => {
        const { container } = render(
            <Select defaultValue="a">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="a">A</SelectItem>
                </SelectContent>
            </Select>,
        );

        expect(
            container.querySelector('svg.lucide-chevrons-up-down'),
        ).not.toBeNull();
    });
});

describe('Overlay close buttons', () => {
    it.each([
        'src/components/ui/dialog.tsx',
        'src/components/ui/sheet.tsx',
        'src/components/ui/floating-sheet-panel.tsx',
    ])('%s closes with a glass button', (file) => {
        const source = readFileSync(file, 'utf8');

        expect(source).toContain('glassBubble');
        expect(source).not.toContain('border border-border bg-muted');
    });
});

describe('choosing in the dropdown', () => {
    it('still chooses an item after the opening moment, even after re-renders', async () => {
        const onSelect = vi.fn();
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>More</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={onSelect}>
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>Copy</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        await user.click(
            document.querySelector('[data-slot="dropdown-menu-trigger"]')!,
        );
        await new Promise((resolve) => setTimeout(resolve, 350));
        await user.hover(
            document.querySelectorAll('[data-slot="dropdown-menu-item"]')[1]!,
        );
        await user.click(
            document.querySelector('[data-slot="dropdown-menu-item"]')!,
        );

        expect(onSelect).toHaveBeenCalled();
    });
});
