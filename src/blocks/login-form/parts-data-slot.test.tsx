/** @vitest-environment jsdom */

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
} from './parts';

afterEach(cleanup);

describe('the login form parts data-slot', () => {
    it.each([
        {
            name: 'LoginFormRoot',
            slot: 'login-form',
            element: (slotName?: string) => (
                <LoginFormRoot slotName={slotName}>
                    <span />
                </LoginFormRoot>
            ),
        },
        {
            name: 'LoginFormStatus',
            slot: 'login-form-status',
            element: (slotName?: string) => (
                <LoginFormStatus message="Reset." slotName={slotName} />
            ),
        },
        {
            name: 'LoginFormEmail',
            slot: 'login-form-email',
            element: (slotName?: string) => (
                <LoginFormEmail slotName={slotName} />
            ),
        },
        {
            name: 'LoginFormPassword',
            slot: 'login-form-password',
            element: (slotName?: string) => (
                <LoginFormPassword slotName={slotName} />
            ),
        },
        {
            name: 'LoginFormRemember',
            slot: 'login-form-remember',
            element: (slotName?: string) => (
                <LoginFormRemember slotName={slotName} />
            ),
        },
        {
            name: 'LoginFormSubmit',
            slot: 'login-form-submit',
            element: (slotName?: string) => (
                <LoginFormSubmit slotName={slotName} />
            ),
        },
    ])(
        '$name renders data-slot="$slot" by default, and honours a slotName override',
        ({ slot, element }) => {
            const { container } = render(element());

            expect(
                container.querySelector(`[data-slot="${slot}"]`),
            ).not.toBeNull();

            cleanup();

            const { container: overridden } = render(element('custom-slot'));

            expect(
                overridden.querySelector('[data-slot="custom-slot"]'),
            ).not.toBeNull();
            expect(
                overridden.querySelector(`[data-slot="${slot}"]`),
            ).toBeNull();
        },
    );
});
