// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

const positions: Record<string, number> = {
    Account: 10,
    Password: 120,
    Billing: 240,
};
const ITEM_SLOTS = [
    'tabs-trigger',
    'toggle-group-item',
    'navigation-menu-trigger',
];
const restore: [string, PropertyDescriptor | undefined][] = [];

function define(name: string, read: (el: HTMLElement) => unknown) {
    restore.push([
        name,
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, name),
    ]);
    Object.defineProperty(HTMLElement.prototype, name, {
        configurable: true,
        get() {
            return read(this as HTMLElement);
        },
    });
}

const at = (el: HTMLElement) =>
    ITEM_SLOTS.includes(el.dataset.slot ?? '')
        ? (positions[(el.textContent ?? '').trim()] ?? 0)
        : 0;

beforeAll(() => {
    patchPointerApis();
    define('offsetLeft', at);
    define('offsetTop', at);
    define('offsetWidth', () => 80);
    define('offsetHeight', () => 32);
    define(
        'offsetParent',
        (el) =>
            el.parentElement?.closest(
                '[data-slot$="-item"], [data-slot$="-list"], [data-slot="toggle-group"]',
            ) ?? null,
    );
});

afterAll(() => {
    for (const [name, descriptor] of restore) {
        if (descriptor) {
            Object.defineProperty(HTMLElement.prototype, name, descriptor);
        }
    }
});

afterEach(cleanup);

const tabs = (orientation: 'horizontal' | 'vertical' = 'horizontal') => (
    <Tabs defaultValue="account" orientation={orientation}>
        <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
    </Tabs>
);

const pill = (slot: string) =>
    document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

describe('the tabs pill', () => {
    it('sits behind the active tab, which paints no background of its own', () => {
        render(tabs());

        expect(pill('tabs-indicator')?.getAttribute('aria-hidden')).toBe(
            'true',
        );
        expect(pill('tabs-indicator')?.style.transform).toContain(
            'translateX(10px)',
        );
        expect(
            screen.getByRole('tab', { name: 'Account' }).className,
        ).not.toContain('bg-tab-active');
    });

    it('follows the tab that becomes active', async () => {
        const user = userEvent.setup();
        render(tabs());

        await user.click(screen.getByRole('tab', { name: 'Password' }));

        await waitFor(() =>
            expect(pill('tabs-indicator')?.style.transform).toContain(
                'translateX(120px)',
            ),
        );
    });

    it('moves along the column of vertical tabs', async () => {
        const user = userEvent.setup();
        render(tabs('vertical'));

        await user.click(screen.getByRole('tab', { name: 'Password' }));

        await waitFor(() =>
            expect(pill('tabs-indicator')?.style.transform).toContain(
                'translateY(120px)',
            ),
        );
    });
});

describe('the toggle group pill', () => {
    const group = (type: 'single' | 'multiple') =>
        type === 'single' ? (
            <ToggleGroup type="single" defaultValue="account">
                <ToggleGroupItem value="account">Account</ToggleGroupItem>
                <ToggleGroupItem value="billing">Billing</ToggleGroupItem>
            </ToggleGroup>
        ) : (
            <ToggleGroup type="multiple" defaultValue={['account']}>
                <ToggleGroupItem value="account">Account</ToggleGroupItem>
                <ToggleGroupItem value="billing">Billing</ToggleGroupItem>
            </ToggleGroup>
        );

    it('slides under the pressed item of a single group and follows a press', async () => {
        const user = userEvent.setup();
        render(group('single'));

        expect(pill('toggle-group-indicator')?.style.transform).toContain(
            'translateX(10px)',
        );
        expect(
            screen.getByRole('radio', { name: 'Account' }).className,
        ).toContain('data-[state=on]:bg-transparent');

        await user.click(screen.getByRole('radio', { name: 'Billing' }));

        await waitFor(() =>
            expect(pill('toggle-group-indicator')?.style.transform).toContain(
                'translateX(240px)',
            ),
        );
    });

    it('stays out of a multiple group, and leaves when a group turns multiple', () => {
        const { rerender } = render(group('multiple'));

        expect(pill('toggle-group-indicator')).toBeNull();

        rerender(group('single'));
        expect(pill('toggle-group-indicator')).not.toBeNull();

        rerender(group('multiple'));
        expect(pill('toggle-group-indicator')).toBeNull();
    });
});

describe('the navigation menu highlight', () => {
    it('is hidden until a menu opens and then sits on its trigger', async () => {
        const user = userEvent.setup();
        render(
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Billing</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const highlight = pill('navigation-menu-highlight');

        expect(highlight?.getAttribute('role')).toBe('presentation');
        expect(
            highlight?.style.opacity === '' || highlight?.style.opacity === '0',
        ).toBe(true);

        await user.click(screen.getByRole('button', { name: 'Billing' }));

        await waitFor(() =>
            expect(highlight?.style.transform).toContain('translateX(240px)'),
        );
    });
});

describe('the pills on awkward input', () => {
    it('keeps the end corners and borders of the first and last toggle items', () => {
        render(
            <ToggleGroup type="single" defaultValue="account">
                <ToggleGroupItem value="account">Account</ToggleGroupItem>
                <ToggleGroupItem value="billing">Billing</ToggleGroupItem>
            </ToggleGroup>,
        );

        const first = screen.getByRole('radio', { name: 'Account' }).className;

        expect(first).toContain('first-of-type:rounded-l-2xl');
        expect(first).toContain('last-of-type:rounded-r-2xl');
        expect(first).toContain(
            'data-[variant=outline]:first-of-type:border-l',
        );
    });

    it('leaves the outline variant without a pill', () => {
        render(
            <ToggleGroup type="single" variant="outline" defaultValue="account">
                <ToggleGroupItem value="account">Account</ToggleGroupItem>
            </ToggleGroup>,
        );

        expect(pill('toggle-group-indicator')).toBeNull();
    });

    it('still measures when the consumer passes its own ref', () => {
        const groupRef = createRef<HTMLDivElement>();
        const listRef = createRef<HTMLUListElement>();

        render(
            <>
                <ToggleGroup
                    ref={groupRef}
                    type="single"
                    defaultValue="account"
                >
                    <ToggleGroupItem value="account">Account</ToggleGroupItem>
                </ToggleGroup>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList ref={listRef}>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Billing
                            </NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </>,
        );

        expect(groupRef.current?.dataset.slot).toBe('toggle-group');
        expect(listRef.current?.dataset.slot).toBe('navigation-menu-list');
        expect(pill('toggle-group-indicator')?.style.transform).toContain(
            'translateX(10px)',
        );
    });

    it('hides the menu highlight again when the menu closes', async () => {
        const menu = (value: string) => (
            <NavigationMenu
                viewport={false}
                value={value}
                onValueChange={() => {}}
            >
                <NavigationMenuList>
                    <NavigationMenuItem value="billing">
                        <NavigationMenuTrigger>Billing</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        const { rerender } = render(menu('billing'));

        await waitFor(() =>
            expect(pill('navigation-menu-highlight')?.style.opacity).toBe('1'),
        );
        rerender(menu(''));

        await waitFor(
            () =>
                expect(pill('navigation-menu-highlight')?.style.opacity).toBe(
                    '0',
                ),
            { timeout: 1500 },
        );
    });

    it('runs the cleanup a consumer callback ref returns', () => {
        const calls: string[] = [];
        const { unmount } = render(
            <ToggleGroup
                type="single"
                ref={(node) => {
                    calls.push(node ? 'attach' : 'null');

                    return () => {
                        calls.push('cleanup');
                    };
                }}
            >
                <ToggleGroupItem value="account">Account</ToggleGroupItem>
            </ToggleGroup>,
        );

        unmount();

        expect(calls).toEqual(['attach', 'cleanup']);
    });
});
