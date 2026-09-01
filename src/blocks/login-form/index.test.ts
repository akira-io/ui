import { describe, expect, it } from 'vitest';

import type { LoginFormStatusProps } from './index';
import { LoginForm } from './index';
import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
} from './parts';

describe('the LoginForm namespace', () => {
    it('carries every part the docs teach consumers to use', () => {
        expect(LoginForm.Root).toBeDefined();
        expect(LoginForm.Status).toBeDefined();
        expect(LoginForm.Email).toBeDefined();
        expect(LoginForm.Password).toBeDefined();
        expect(LoginForm.Remember).toBeDefined();
        expect(LoginForm.Submit).toBeDefined();
    });

    it('maps each key to the actual named export, not just any defined value', () => {
        expect(LoginForm.Root).toBe(LoginFormRoot);
        expect(LoginForm.Status).toBe(LoginFormStatus);
        expect(LoginForm.Email).toBe(LoginFormEmail);
        expect(LoginForm.Password).toBe(LoginFormPassword);
        expect(LoginForm.Remember).toBe(LoginFormRemember);
        expect(LoginForm.Submit).toBe(LoginFormSubmit);
    });
});

describe('the public export surface', () => {
    it('does not export the dead label resolver or the internal field-error helper', async () => {
        const module = (await import('./index')) as Record<string, unknown>;

        expect(module.resolveLoginFormLabels).toBeUndefined();
        expect(module.fieldError).toBeUndefined();
    });

    it('shapes LoginFormStatusProps the way a consumer annotates a status message, a claim only the typecheck can hold, since transpilation erases the annotation', () => {
        const props: LoginFormStatusProps = { message: 'ok' };

        expect(props.message).toBe('ok');
    });
});
