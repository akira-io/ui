import { describe, expect, it } from 'vitest';

import { SIDEBAR_COOKIE_NAME, readSidebarState } from '@/lib/sidebar-cookie';

describe('readSidebarState', () => {
    it('names the cookie the provider writes', () => {
        expect(SIDEBAR_COOKIE_NAME).toBe('sidebar_state');
    });

    it.each([
        ['sidebar_state=true', true],
        ['sidebar_state=false', false],
        ['theme=dark; sidebar_state=false', false],
        ['theme=dark;sidebar_state=true;lang=pt', true],
        ['  sidebar_state = false ', false],
        ['sidebar_state=false; sidebar_state=true', false],
        ['sidebar_state=; sidebar_state=false', false],
        ['sidebar_state=1; sidebar_state=true', true],
    ])('reads %j as %s', (header, expected) => {
        expect(readSidebarState(header)).toBe(expected);
    });

    it.each([
        [undefined],
        [null],
        [''],
        ['theme=dark'],
        ['sidebar_state='],
        ['sidebar_state=yes'],
        ['my_sidebar_state=false'],
    ])('has no opinion for %j', (header) => {
        expect(readSidebarState(header)).toBeUndefined();
    });
});
