// @vitest-environment node

import type * as Blocks from '@/blocks';
import { describe, expect, it } from 'vitest';

interface LoginFormTypeSurface {
    contextValue: Blocks.LoginFormContextValue;
    email: Blocks.LoginFormEmailProps;
    errors: Blocks.LoginFormErrors;
    labels: Blocks.LoginFormLabels;
    password: Blocks.LoginFormPasswordProps;
    preset: Blocks.LoginFormPresetProps;
    remember: Blocks.LoginFormRememberProps;
    root: Blocks.LoginFormRootProps;
    status: Blocks.LoginFormStatusProps;
    submit: Blocks.LoginFormSubmitProps;
}

const loginFormTypeSurface: Partial<LoginFormTypeSurface> = {};

describe('the type-only surface of the blocks entry', () => {
    it('still names every login form type, which Object.keys cannot see', () => {
        expect(loginFormTypeSurface).toEqual({});
    });
});
