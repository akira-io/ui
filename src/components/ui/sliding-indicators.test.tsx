// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
const original = HTMLElement.prototype.getBoundingClientRect;

beforeAll(() => {
    patchPointerApis();
    HTMLElement.prototype.getBoundingClientRect = function () {
        const at = positions[(this.textContent ?? '').trim()];

        const item = [
            'tabs-trigger',
            'toggle-group-item',
            'navigation-menu-trigger',
        ].includes(this.dataset.slot ?? '');

        return at === undefined || !item
            ? ({ left: 0, top: 0, width: 0, height: 0 } as DOMRect)
            : ({ left: at, top: at, width: 80, height: 32 } as DOMRect);
    };
});

afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect = original;
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

    it('slides under the pressed item of a single group', () => {
        render(group('single'));

        expect(pill('toggle-group-indicator')?.style.transform).toContain(
            'translateX(10px)',
        );
        expect(
            screen.getByRole('radio', { name: 'Account' }).className,
        ).toContain('data-[state=on]:bg-transparent');
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
