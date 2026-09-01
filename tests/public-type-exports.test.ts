import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const declaration = fileURLToPath(
    new URL('../dist/blocks.d.ts', import.meta.url),
);

const PART_PROP_TYPES = [
    'LoginFormEmailProps',
    'LoginFormPasswordProps',
    'LoginFormPresetProps',
    'LoginFormRememberProps',
    'LoginFormRootProps',
    'LoginFormStatusProps',
    'LoginFormSubmitProps',
];

function exportedNames(): string[] {
    return [
        ...readFileSync(declaration, 'utf8').matchAll(/export\s*{([^}]*)}/g),
    ]
        .flatMap((match) => match[1].split(','))
        .map((specifier) => specifier.trim().replace(/^type\s+/, ''))
        .map((specifier) => specifier.split(/\s+as\s+/).pop() ?? '')
        .filter(Boolean);
}

describe('the login form public type surface', () => {
    it.each(PART_PROP_TYPES)(
        'ships %s from the built blocks entry, which no annotation inside a test can guard once transpilation erases it',
        (name) => {
            expect(exportedNames()).toContain(name);
        },
    );
});
