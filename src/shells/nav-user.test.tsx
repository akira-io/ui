// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { compactRadius } from '@/lib/language';
import { CollapsedUserRow, partClasses } from '../../tests/fixtures/nav-user';

beforeAll(() => {
    window.matchMedia ??= ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
});

afterEach(cleanup);

const ICON_MODE = 'group-data-[collapsible=icon]:';

const RADIUS_PREFIX = `${compactRadius.split('-')[0]}-`;

function classesOf(slot: string): string[] {
    render(<CollapsedUserRow />);

    return partClasses(slot);
}

describe('the user avatar', () => {
    it('follows the rail radius instead of being the one circle', () => {
        expect(classesOf('avatar')).toContain(compactRadius);
    });

    it('is not a circle', () => {
        expect(classesOf('avatar')).not.toContain(`${RADIUS_PREFIX}full`);
    });

    it('fills the button in the collapsed rail', () => {
        expect(classesOf('avatar')).toContain(`${ICON_MODE}size-10`);
    });

    it('keeps its smaller size while the rail is open', () => {
        expect(classesOf('avatar')).toContain('size-8');
    });

    it('sizes itself once, rather than restating the Avatar defaults', () => {
        const classes = classesOf('avatar');

        expect(classes).not.toContain('h-8');
        expect(classes).not.toContain('w-8');
        expect(
            classes.filter((name) => name.startsWith(RADIUS_PREFIX)),
        ).toEqual([compactRadius]);
    });
});

describe('the collapsed user row', () => {
    it('hides the name and email, which have no room in the rail', () => {
        expect(classesOf('user-info-identity')).toContain(`${ICON_MODE}hidden`);
    });

    it('hides the chevron rather than letting it overflow and clip', () => {
        expect(classesOf('nav-user-chevron')).toContain(`${ICON_MODE}hidden`);
    });

    it('lets the avatar reach the button edge', () => {
        expect(classesOf('sidebar-menu-button')).toContain(`${ICON_MODE}p-0!`);
    });
});

describe('the user row height', () => {
    it('matches every other row rather than standing 12px taller', () => {
        expect(classesOf('sidebar-menu-button')).not.toContain('h-14');
    });

    it('is the same height as a nav item', () => {
        expect(classesOf('sidebar-menu-button')).toContain('h-11');
    });
});

describe('the user row as a control', () => {
    it('carries a resting fill, so it reads as the control it is', () => {
        expect(classesOf('sidebar-menu-button')).toContain('bg-sidebar-accent');
    });

    it('points, because clicking it opens the account menu', () => {
        expect(classesOf('sidebar-menu-button')).toContain('cursor-pointer');
    });

    it('steps one shade on hover rather than jumping to the border tone', () => {
        const classes = classesOf('sidebar-menu-button');

        expect(classes).toContain('hover:bg-sidebar-accent-hover');
        expect(classes).not.toContain('hover:bg-sidebar-border');
    });

    it('shows the hover fill while the menu is open', () => {
        expect(classesOf('sidebar-menu-button')).toContain(
            'data-[state=open]:bg-sidebar-accent-hover',
        );
    });
});
