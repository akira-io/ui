/** @vitest-environment jsdom */

import { act, render } from '@testing-library/react';
import { Bold } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from './toggle';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

describe('Toggle material', () => {
    it('is a glass bubble that paints its icon in the accent when on', () => {
        const { container } = render(
            <Toggle aria-label="Bold" defaultPressed>
                <Bold />
            </Toggle>,
        );
        const className = container.querySelector('button')!.className;

        expect(className.split(' ')).toContain('glass-button');
        expect(className).toContain('data-[state=on]:text-primary');
        expect(className.split(' ')).toContain('aspect-square');
    });

    it.each([
        ['sm', 'h-8'],
        ['lg', 'h-12'],
    ] as const)(
        'keeps an icon toggle square at the %s height',
        (size, height) => {
            const { container } = render(
                <Toggle aria-label="Bold" size={size}>
                    <Bold />
                </Toggle>,
            );
            const classes = container
                .querySelector('button')!
                .className.split(' ');

            expect(classes).toContain(height);
            expect(classes).toContain('aspect-square');
            expect(classes).not.toContain('size-control');
        },
    );

    it('keeps an icon item of a sized group square at the group height', () => {
        const { container } = render(
            <ToggleGroup type="multiple" size="sm">
                <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold />
                </ToggleGroupItem>
            </ToggleGroup>,
        );
        const classes = container.querySelector('button')!.className.split(' ');

        expect(classes).toContain('h-8');
        expect(classes).not.toContain('size-control');
    });

    it('fills with muted when solid', () => {
        const { container } = render(
            <Toggle aria-label="Bold" material="solid">
                <Bold />
            </Toggle>,
        );

        expect(container.querySelector('button')!.className).toContain(
            'data-[state=on]:bg-muted',
        );
    });
});

function place(items: NodeListOf<HTMLElement>) {
    items.forEach((item, index) => {
        Object.defineProperty(item, 'offsetLeft', { value: index * 60 });
        Object.defineProperty(item, 'offsetTop', { value: 0 });
        Object.defineProperty(item, 'offsetWidth', { value: 60 });
        Object.defineProperty(item, 'offsetHeight', { value: 40 });
    });
}

describe('Segmented selection', () => {
    it('draws the selection as a glass bubble', () => {
        const { container } = render(
            <ToggleGroup type="single" defaultValue="day">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>,
        );

        expect(
            container.querySelector('[data-slot="toggle-group-indicator"]')!
                .className,
        ).toContain('glass-button');
    });

    it('chooses the segment the selection is dropped on', () => {
        const onValueChange = vi.fn();
        const { container } = render(
            <ToggleGroup
                type="single"
                defaultValue="day"
                onValueChange={onValueChange}
            >
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>,
        );
        const items = container.querySelectorAll<HTMLElement>(
            '[data-slot="toggle-group-item"]',
        );
        const lens = container.querySelector(
            '[data-slot="toggle-group-indicator"]',
        )!;

        place(items);
        Object.defineProperty(
            container.querySelector('[data-slot="toggle-group"]'),
            'offsetWidth',
            { value: 120 },
        );
        act(() => {
            items[0].dispatchEvent(
                new PointerEvent('pointerdown', {
                    bubbles: true,
                    pointerId: 1,
                    button: 0,
                    clientX: 30,
                }),
            );
            window.dispatchEvent(
                new PointerEvent('pointermove', { pointerId: 1, clientX: 90 }),
            );
        });
        expect(lens.hasAttribute('data-dragging')).toBe(true);

        act(() => {
            window.dispatchEvent(
                new PointerEvent('pointerup', { pointerId: 1, clientX: 90 }),
            );
        });

        expect(onValueChange).toHaveBeenCalledWith('week');
        expect(lens.hasAttribute('data-dragging')).toBe(false);
    });
});

describe('the tab bar lens', () => {
    it('is the same glass bubble as the segmented selection', async () => {
        const { GlassTabBar, GlassTabBarItem } =
            await import('./glass-tab-bar');
        const { container } = render(
            <GlassTabBar label="Main" value="home">
                <GlassTabBarItem value="home" label="Home" icon={<Bold />} />
            </GlassTabBar>,
        );

        expect(
            container.querySelector('[data-slot="glass-tab-bar-lens"]')!
                .className,
        ).toContain('glass-button');
    });
});

describe('icon toggles', () => {
    it('keep the control width inside a group, so a lone icon is a circle', () => {
        const { container } = render(
            <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold />
                </ToggleGroupItem>
            </ToggleGroup>,
        );
        const item = container.querySelector(
            '[data-slot="toggle-group-item"]',
        )!;

        expect(item.className.split(' ')).toContain('min-w-control');
        expect(item.className.split(' ')).not.toContain('min-w-0');
    });
});

describe('toggle padding', () => {
    it('draws a lone icon as a circle the size of the control', () => {
        const { container } = render(
            <Toggle aria-label="Bold">
                <Bold />
            </Toggle>,
        );
        const className = container
            .querySelector('button')!
            .className.split(' ');

        expect(className).toContain('h-control');
        expect(className).toContain('aspect-square');
        expect(className).toContain('px-0');
    });

    it('pads an icon with a label by the inset', () => {
        const { container } = render(
            <Toggle aria-label="Star">
                <Bold />
                Star
            </Toggle>,
        );
        const className = container
            .querySelector('button')!
            .className.split(' ');

        expect(className).toContain('px-inset');
        expect(className).not.toContain('aspect-square');
    });
});
