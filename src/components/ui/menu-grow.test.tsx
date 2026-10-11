/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';

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

beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe('Menus grow out of their trigger', () => {
    it('opens a dropdown from the trigger, also from the keyboard', async () => {
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

        expect(
            document.querySelector(
                '[data-slot="dropdown-menu-content"][data-zoom-surface]',
            ),
        ).not.toBeNull();
    });

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
