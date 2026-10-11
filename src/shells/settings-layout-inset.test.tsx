// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SettingsLayout } from '@/shells/settings-layout';

afterEach(cleanup);

describe('the settings layout margin', () => {
    it('starts at the same inset as the app header above it', () => {
        render(
            <SettingsLayout
                items={[{ title: 'Profile', href: '/settings/profile' }]}
                currentPath="/settings/profile"
            >
                <p>body</p>
            </SettingsLayout>,
        );

        const page = screen.getByText('body').closest('.py-6') as HTMLElement;

        expect(page.className.split(' ')).toContain('px-inset');
    });
});
