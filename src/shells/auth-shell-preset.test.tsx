/** @vitest-environment jsdom */

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AuthShell } from './auth-shell';

afterEach(cleanup);

describe('the AuthShell preset', () => {
    it('renders the same markup after the compound refactor', () => {
        const { container } = render(
            <AuthShell
                logo={<span>Mark</span>}
                title="Sign in"
                description="Use your work account"
                footer={<a href="/forgot">Forgot your password?</a>}
                appearanceControl={<button type="button">Theme</button>}
            >
                <form />
            </AuthShell>,
        );

        expect(container.innerHTML).toMatchSnapshot();
    });

    it('renders the same markup without a surface', () => {
        const { container } = render(
            <AuthShell title="Sign in" surface={false}>
                <form />
            </AuthShell>,
        );

        expect(container.innerHTML).toMatchSnapshot();
    });

    it('renders the same markup when split', () => {
        const { container } = render(
            <AuthShell
                arrangement="split"
                title="Sign in"
                panel={<p>Art</p>}
                logo={<span>Mark</span>}
            >
                <form />
            </AuthShell>,
        );

        expect(container.innerHTML).toMatchSnapshot();
    });
});
