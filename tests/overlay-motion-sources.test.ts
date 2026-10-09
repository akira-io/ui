import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const MIGRATED_OVERLAYS = [
    'src/components/ui/popover.tsx',
    'src/components/ui/hover-card.tsx',
    'src/components/ui/tooltip.tsx',
    'src/components/ui/dropdown-menu.tsx',
    'src/components/ui/dropdown-menu-sub.tsx',
    'src/components/ui/context-menu.tsx',
    'src/components/ui/context-menu-sub.tsx',
];

const CSS_ANIMATION =
    /\b(animate-in|animate-out|fade-in-0|fade-out-0|zoom-in-95|zoom-out-95|slide-in-from-\w+-2)\b/;

function source(file: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../${file}`, import.meta.url)),
        'utf8',
    );
}

describe('the overlays migrated to motion', () => {
    it.each(MIGRATED_OVERLAYS)(
        '%s leaves tailwindcss-animate behind',
        (file) => {
            expect(source(file)).not.toMatch(CSS_ANIMATION);
        },
    );

    it.each(MIGRATED_OVERLAYS)(
        '%s draws its content on the spring surface',
        (file) => {
            expect(source(file)).toContain('<OverlaySurface');
        },
    );
});
