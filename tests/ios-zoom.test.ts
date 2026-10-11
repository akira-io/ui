import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { fieldText } from '../src/lib/language';

const TYPED_CONTROLS = [
    'components/ui/input.tsx',
    'components/ui/textarea.tsx',
    'components/ui/select.tsx',
    'components/ui/date-picker.tsx',
    'components/ui/date-time-picker.tsx',
    'components/ui/picker-trigger.tsx',
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
    it('reaches 16px under touch, below which iOS Safari zooms the page on focus', () => {
        expect(fieldText).toBe('text-control');
        expect(read('../hig.css')).toMatch(
            /@media \(pointer: coarse\)[\s\S]*--control-text:\s*16px/,
        );
    });
});

describe('every control the keyboard opens', () => {
    it.each(TYPED_CONTROLS)('reaches 16px on a phone: %s', (path) => {
        const source = read(path);

        expect(source).toMatch(
            /fieldSurface|pickerTriggerClasses|text-control/,
        );
    });

    it.each(TYPED_CONTROLS)(
        'keeps the smaller step off the control itself: %s',
        (path) => {
            const controlLines = read(path)
                .split('\n')
                .filter((line) => /h-control|min-h-24|size-control/.test(line))
                .filter((line) => /(^|[\s'`])text-sm/.test(line))
                .filter((line) => !line.includes('sm:text-sm'));

            expect(controlLines).toEqual([]);
        },
    );
});
