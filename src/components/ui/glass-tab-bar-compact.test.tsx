// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { GlassTabBar, GlassTabBarItem } from '@/components/ui/glass-tab-bar';

afterEach(() => {
    cleanup();
    scrollTo(0);
});

function scrollTo(y: number) {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: y });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
    });
}

const bar = (compactOnScroll = true) => (
    <GlassTabBar
        label="Main"
        defaultValue="home"
        compactOnScroll={compactOnScroll}
    >
        <GlassTabBarItem value="home" icon={<span>H</span>} label="Home" />
    </GlassTabBar>
);

const nav = () => screen.getByRole('navigation', { name: 'Main' });

describe('the glass tab bar while scrolling', () => {
    it('folds while the page scrolls down and opens again on the way up', () => {
        render(bar());

        scrollTo(20);
        scrollTo(40);
        expect(nav().dataset.compact).toBe('true');

        scrollTo(20);
        expect(nav().dataset.compact).toBeUndefined();
    });

    it('opens near the top of the page', () => {
        render(bar());

        scrollTo(200);
        expect(nav().dataset.compact).toBe('true');

        scrollTo(4);
        expect(nav().dataset.compact).toBeUndefined();
    });

    it('ignores small jitter', () => {
        render(bar());

        scrollTo(100);
        scrollTo(96);
        scrollTo(102);

        expect(nav().dataset.compact).toBe('true');
    });

    it('keeps the labels named while folded', () => {
        render(bar());

        scrollTo(100);

        expect(screen.getByRole('button', { name: 'Home' })).toBeTruthy();
    });

    it('stays open without compactOnScroll', () => {
        render(bar(false));

        scrollTo(200);

        expect(nav().dataset.compact).toBeUndefined();
    });
});
