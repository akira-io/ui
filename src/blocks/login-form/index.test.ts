import { describe, expect, it } from 'vitest';

import type { LoginFormStatusProps } from './index';
import { LoginForm } from './index';

describe('the LoginForm namespace', () => {
    it('carries every part the docs teach consumers to use', () => {
        expect(LoginForm.Root).toBeDefined();
        expect(LoginForm.Status).toBeDefined();
        expect(LoginForm.Email).toBeDefined();
        expect(LoginForm.Password).toBeDefined();
        expect(LoginForm.Remember).toBeDefined();
        expect(LoginForm.Submit).toBeDefined();
    });
});

describe('the public export surface', () => {
    it('does not export the dead label resolver or the internal field-error helper', async () => {
        const module = (await import('./index')) as Record<string, unknown>;

        expect(module.resolveLoginFormLabels).toBeUndefined();
        expect(module.fieldError).toBeUndefined();
    });

    it('re-exports LoginFormStatusProps alongside the other part prop types', () => {
        const props: LoginFormStatusProps = { message: 'ok' };

        expect(props.message).toBe('ok');
    });
});
