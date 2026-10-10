// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/shells/user-menu-content';

afterEach(cleanup);

describe('the user menu header', () => {
    it('shows the name and email without the uppercase label style', () => {
        render(
            <DropdownMenu open>
                <DropdownMenuContent>
                    <UserMenuContent
                        user={{ name: 'Ana Lima', email: 'ana@example.test' }}
                        settingsHref="/settings"
                        logoutHref="/logout"
                    />
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const header = document.querySelector(
            '[data-slot="dropdown-menu-label"]',
        )!;
        const classes = header.className.split(/\s+/);

        expect(header.textContent).toContain('Ana Lima');
        expect(header.textContent).toContain('ana@example.test');
        expect(classes).not.toContain('uppercase');
        expect(classes).toContain('normal-case');
        expect(classes).not.toContain('tracking-wider');
    });
});
