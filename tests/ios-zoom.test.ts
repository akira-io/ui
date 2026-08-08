import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { fieldText } from '../src/lib/language';

const TYPED_CONTROLS = [
    'components/ui/input.tsx',
    'components/ui/textarea.tsx',
    'components/ui/select.tsx',
    'components/ui/date-picker.tsx',
    'components/ui/command.tsx',
    'components/ui/input-otp.tsx',
];

function read(path: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../src/${path}`, import.meta.url)),
        'utf8',
    );
}

describe('the field type scale', () => {
    it('starts at 16px, below which iOS Safari zooms the page on focus', () => {
        expect(fieldText.split(/\s+/)[0]).toBe('text-base');
    });

    it('drops to the smaller step once there is room for it', () => {
        expect(fieldText).toContain('sm:text-sm');
    });
});

describe('every control the keyboard opens', () => {
    it.each(TYPED_CONTROLS)('reaches 16px on a phone: %s', (path) => {
        const source = read(path);

        expect(source).toMatch(/fieldSurface|text-base sm:text-sm/);
    });

    it.each(TYPED_CONTROLS)(
        'keeps the smaller step off the control itself: %s',
        (path) => {
            const controlLines = read(path)
                .split('\n')
                .filter((line) => /h-11|min-h-24|size-11/.test(line))
                .filter((line) => /(^|[\s'`])text-sm/.test(line))
                .filter((line) => !line.includes('sm:text-sm'));

            expect(controlLines).toEqual([]);
        },
    );
});
