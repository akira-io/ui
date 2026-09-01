/** @vitest-environment jsdom */

import { act, type ReactElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';

import { LoginFormPreset } from '@/blocks/login-form';
import {
    AuthShellBody,
    AuthShellHeading,
    AuthShellLogo,
    AuthShellMain,
    AuthShellRoot,
    AuthShellSurface,
} from '@/shells/auth-shell';

function composedAuthSurface(): ReactElement {
    return (
        <AuthShellRoot>
            <AuthShellMain>
                <AuthShellSurface>
                    <AuthShellLogo>
                        <span>Mark</span>
                    </AuthShellLogo>
                    <AuthShellHeading title="Login" align="center" />
                    <AuthShellBody>
                        <LoginFormPreset forgotPasswordHref="/forgot" />
                    </AuthShellBody>
                </AuthShellSurface>
            </AuthShellMain>
        </AuthShellRoot>
    );
}

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

afterEach(() => {
    document.body.innerHTML = '';
});

describe('the auth surface hydrating client-side', () => {
    it('agrees with its own server-rendered markup, so Next and Astro do not warn', async () => {
        const html = renderToString(composedAuthSurface());

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const recoverableErrors: unknown[] = [];

        await act(async () => {
            hydrateRoot(container, composedAuthSurface(), {
                onRecoverableError: (error) => {
                    recoverableErrors.push(error);
                },
            });
        });

        expect(recoverableErrors).toEqual([]);
    });
});
