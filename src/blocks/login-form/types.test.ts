import { describe, expect, it } from 'vitest';

import { fieldError } from '@/blocks/login-form/types';

describe('fieldError', () => {
    it('returns undefined when the field is missing', () => {
        expect(fieldError({}, 'email')).toBeUndefined();
    });

    it('returns undefined for a null value', () => {
        const errors = { email: null } as unknown as Parameters<
            typeof fieldError
        >[0];

        expect(fieldError(errors, 'email')).toBeUndefined();
    });

    it('returns undefined for an empty string', () => {
        expect(fieldError({ email: '' }, 'email')).toBeUndefined();
    });

    it('returns a plain string message', () => {
        expect(fieldError({ email: 'Required' }, 'email')).toBe('Required');
    });

    it('returns undefined for an empty array', () => {
        expect(fieldError({ email: [] }, 'email')).toBeUndefined();
    });

    it('returns undefined when every array entry is blank', () => {
        expect(fieldError({ email: ['', ''] }, 'email')).toBeUndefined();
    });

    it('skips leading blank entries to find the first real message', () => {
        expect(fieldError({ email: ['', 'Required'] }, 'email')).toBe(
            'Required',
        );
    });

    it('returns the first non-blank message when several are present', () => {
        expect(fieldError({ email: ['Required', 'Too short'] }, 'email')).toBe(
            'Required',
        );
    });
});
