// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    GlassTabBar,
    GlassTabBarAction,
    GlassTabBarItem,
} from '@/components/ui/glass-tab-bar';
import {
    GlassPillAction,
    GlassPillGroup,
    GlassToolbar,
} from '@/components/ui/glass-toolbar';

afterEach(cleanup);

function slot(name: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(
        `[data-slot="${name}"]`,
    );

    expect(element).not.toBeNull();

    return element as HTMLElement;
}

function toolbar(className?: string) {
    render(
        <GlassToolbar label="Actions">
            <GlassPillGroup className={className}>
                <GlassPillAction icon={<span>A</span>} label="Archive" />
            </GlassPillGroup>
        </GlassToolbar>,
    );
}

describe('the glass bars', () => {
    it('put the tab bar track and its action on the bar glass', () => {
        render(
            <GlassTabBar
                label="Main"
                defaultValue="home"
                action={
                    <GlassTabBarAction icon={<span>S</span>} label="Search">
                        {() => <input aria-label="Search the app" />}
                    </GlassTabBarAction>
                }
            >
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
            </GlassTabBar>,
        );

        expect(slot('glass-tab-bar-track').classList).toContain('glass-bar');
        expect(slot('glass-tab-bar-action').classList).toContain('glass-bar');
        expect(slot('glass-tab-bar-lens').className).not.toMatch(
            /glass-bar|backdrop-/,
        );
    });

    it('put the pill group on the bar glass and keep the highlight unblurred', () => {
        toolbar();

        expect(slot('glass-pill-group').classList).toContain('glass-bar');
        expect(slot('glass-pill-highlight').className).not.toMatch(
            /glass-bar|backdrop-/,
        );
    });

    it('let a consumer fill replace the glass', () => {
        toolbar('bg-primary');

        expect(slot('glass-pill-group').classList).not.toContain('glass-bar');
        expect(slot('glass-pill-group').classList).toContain('bg-primary');
    });
});
