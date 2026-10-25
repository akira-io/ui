import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const CONTROLS = [
    'src/components/ui/button-variants.ts',
    'src/components/ui/switch.tsx',
    'src/components/ui/checkbox.tsx',
    'src/components/ui/radio-group.tsx',
    'src/components/ui/toggle.tsx',
    'src/components/ui/toggle-group.tsx',
    'src/components/ui/select.tsx',
    'src/components/ui/dropdown-menu.tsx',
    'src/components/ui/picker-trigger.tsx',
    'src/components/ui/time-picker.tsx',
];

describe('control cursor', () => {
    it.each(CONTROLS)('keeps the arrow on %s', (path) => {
        const source = readFileSync(path, 'utf8').replace(
            /link:\s*'[^']*'/,
            '',
        );

        expect(source).not.toContain('cursor-pointer');
    });

    it('keeps the hand on text links', () => {
        expect(
            readFileSync('src/components/ui/text-link.tsx', 'utf8'),
        ).toContain('cursor-pointer');
    });
});
