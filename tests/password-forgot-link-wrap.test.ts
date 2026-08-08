import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

function read(path: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../src/${path}`, import.meta.url)),
        'utf8',
    );
}

function componentBody(source: string, component: string): string {
    const start = source.indexOf(`export function ${component}(`);

    if (start < 0) {
        throw new Error(`component not found: ${component}`);
    }

    const next = source.indexOf('\nexport function ', start + 1);

    return source.slice(start, next === -1 ? source.length : next);
}

const parts = read('blocks/login-form/parts.tsx');
const password = componentBody(parts, 'LoginFormPassword');
const email = componentBody(parts, 'LoginFormEmail');

describe('the password label and forgot-password link on a phone', () => {
    it('lets the link give up the row instead of splitting words with it', () => {
        expect(password).toContain('flex-wrap');
    });

    it('no longer forces both texts onto one non-wrapping row', () => {
        expect(password).not.toContain('ml-auto');
        expect(password).not.toMatch(/className="flex items-center"/);
    });

    it('still puts the link on the right when both fit on one row', () => {
        expect(password).toContain('justify-between');
    });
});

describe('the email label, which has no neighbour to fight for the row', () => {
    it('was never given the two-item row the password field has', () => {
        expect(email).not.toContain('flex-wrap');
        expect(email).not.toContain('justify-between');
        expect(email).not.toContain('ml-auto');
    });
});
