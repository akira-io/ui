// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Home } from 'lucide-react';
import type * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GlassTabBar, GlassTabBarItem } from '@/components/ui/glass-tab-bar';
import {
    TAB_COUNT_WARNING,
    TAB_LABEL_WARNING,
} from '@/components/ui/glass-tab-bar-context';
import { resetDevWarnings } from '@/lib/dev-warning';

afterEach(() => {
    cleanup();
    resetDevWarnings();
    vi.restoreAllMocks();
});

function bar(count: number, label = (index: number) => `Tab ${index}`) {
    return render(
        <GlassTabBar label="Sections" defaultValue="t0">
            {Array.from({ length: count }, (_, index) => (
                <GlassTabBarItem
                    key={index}
                    value={`t${index}`}
                    icon={<Home />}
                    label={label(index)}
                />
            ))}
        </GlassTabBar>,
    );
}

describe('the tab bar rules', () => {
    it('warns past five tabs and still draws all of them', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        bar(6);

        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(TAB_COUNT_WARNING),
        );
        expect(screen.getAllByRole('button')).toHaveLength(6);
    });

    it('accepts five tabs quietly', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        bar(5);

        expect(warn).not.toHaveBeenCalled();
    });

    it('warns about a tab without a visible label', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        bar(3, (index) => (index === 1 ? ' ' : `Tab ${index}`));

        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(TAB_LABEL_WARNING),
        );
    });

    it('moves focus across every tab with the arrow keys', () => {
        bar(3);
        const [first, second, third] = screen.getAllByRole('button');
        first.focus();

        fireEvent.keyDown(first, { key: 'ArrowRight' });
        expect(document.activeElement).toBe(second);
        fireEvent.keyDown(second, { key: 'ArrowRight' });
        expect(document.activeElement).toBe(third);
    });

    it('starts focus on the first tab when the value matches none', () => {
        render(
            <GlassTabBar label="Sections" value="gone">
                <GlassTabBarItem value="a" icon={<Home />} label="A" />
                <GlassTabBarItem value="b" icon={<Home />} label="B" />
            </GlassTabBar>,
        );

        expect(screen.getByRole('button', { name: 'A' }).tabIndex).toBe(0);
    });

    it('draws a tab whose label is missing in untyped code and warns', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const untyped = { value: 'a', icon: <Home /> } as unknown as {
            value: string;
            icon: React.ReactNode;
            label: string;
        };

        render(
            <GlassTabBar label="Sections" defaultValue="a">
                <GlassTabBarItem {...untyped} />
            </GlassTabBar>,
        );

        expect(screen.getAllByRole('button')).toHaveLength(1);
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(TAB_LABEL_WARNING),
        );
    });
});
