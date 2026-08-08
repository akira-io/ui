import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { LoginFormPassword, LoginFormPreset } from '@/blocks/login-form';
import {
    AuthShellBody,
    AuthShellHeading,
    AuthShellLogo,
    AuthShellMain,
    AuthShellRoot,
    AuthShellSurface,
} from '@/shells/auth-shell';

describe('the auth surface without a framework', () => {
    it('renders on a server, so Next and Astro can stream it', () => {
        const html = renderToString(
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
            </AuthShellRoot>,
        );

        expect(html).toContain('data-slot="auth-shell"');
        expect(html).toContain('data-slot="login-form"');

        expect(html).toContain('>Login</h1>');

        expect(html).toContain('id="email"');
        expect(html).toContain('name="email"');
        expect(html).toContain('type="email"');

        expect(html).toContain('id="password"');
        expect(html).toContain('name="password"');
        expect(html).toContain('type="password"');

        expect(html).toContain('name="remember"');
        expect(html).toContain('type="checkbox"');

        expect(html).toContain('type="submit"');
        expect(html).toContain('>Log in</button>');

        expect(html).toContain('<a href="/forgot"');
        expect(html).toContain('>Forgot your password?</a>');
    });

    it('falls back to a plain anchor when no link component is given', () => {
        const html = renderToString(
            <LoginFormPassword forgotPasswordHref="/forgot" />,
        );

        expect(html).toContain('<a href="/forgot"');
    });

    it('renders the preset with no provider, router or form library above it', () => {
        const html = renderToString(<LoginFormPreset />);

        expect(html).toContain('Email address');
        expect(html).toContain('Log in');
    });
});
