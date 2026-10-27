// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SettingsLayout } from '@/shells/settings-layout';

afterEach(cleanup);

describe('the settings navigation', () => {
    it('marks the current page like the sidebar does', () => {
        render(
            <SettingsLayout
                items={[
                    { title: 'Profile', href: '/settings/profile' },
                    { title: 'Password', href: '/settings/password' },
                ]}
                currentPath="/settings/profile"
            >
                <p>body</p>
            </SettingsLayout>,
        );

        const current = screen
            .getByRole('link', { name: 'Profile' })
            .className.split(' ');
        const other = screen
            .getByRole('link', { name: 'Password' })
            .className.split(' ');

        expect(current).toEqual(
            expect.arrayContaining([
                'bg-primary/10',
                'text-primary',
                'font-semibold',
                'icon-weight-semibold',
            ]),
        );
        expect(current).not.toContain('bg-muted');
        expect(other).not.toContain('bg-primary/10');
    });
});
