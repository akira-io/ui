// @vitest-environment node

import { describe, expect, it } from 'vitest';

describe('the primitives entry (@/index)', () => {
    it('still exports AkiraMark', async () => {
        const entry = await import('@/index');

        expect(entry).toHaveProperty('AkiraMark');
    });
});

describe('the blocks entry (@/blocks)', () => {
    it('still exports the login form namespace and preset', async () => {
        const entry = await import('@/blocks');

        expect(entry).toHaveProperty('LoginForm');
        expect(entry).toHaveProperty('LoginFormPreset');
    });
});

describe('the shells entry (@/shells)', () => {
    it('still exports the whole AuthShell block', async () => {
        const entry = await import('@/shells');

        expect(entry).toHaveProperty('AuthShell');
        expect(entry).toHaveProperty('AuthShellRoot');
        expect(entry).toHaveProperty('AuthShellPanel');
        expect(entry).toHaveProperty('AuthShellSurface');
        expect(entry).toHaveProperty('AuthShellMain');
        expect(entry).toHaveProperty('AuthShellLogo');
        expect(entry).toHaveProperty('AuthShellHeading');
        expect(entry).toHaveProperty('AuthShellBody');
        expect(entry).toHaveProperty('AuthShellFooter');
        expect(entry).toHaveProperty('useAuthArrangement');
    });
});
