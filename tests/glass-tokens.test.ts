import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
    controlLayer,
    elevatedSurface,
    fieldSurface,
    floatingSurface,
    glassBubble,
    menuHighlight,
    menuSurface,
    nestedSurfaceReset,
    panelSurface,
} from '../src/lib/language';

describe('the surface tokens', () => {
    it('builds the control layer on the bar glass', () => {
        expect(controlLayer.split(' ')).toContain('glass-bar');
    });

    it('builds floating panels on the panel glass', () => {
        expect(floatingSurface.split(' ')).toContain('glass-panel');
        expect(floatingSurface).not.toMatch(/bg-popover\//);
    });

    it('gives menus the same glass as every other panel', () => {
        expect(menuSurface).toBe(panelSurface);
    });

    it('draws content in the same glass as everything else', () => {
        expect(elevatedSurface.split(' ')).toEqual(
            expect.arrayContaining([
                'glass-panel',
                'glass-edge',
                'ring-(color:--glass-button-ring)',
            ]),
        );
        expect(menuHighlight).toContain('focus:bg-(--glass-highlight)');
        expect(menuHighlight).not.toContain('bg-accent');
    });

    it('keeps fields gray in light and glass in dark', () => {
        expect(fieldSurface.split(' ')).toEqual(
            expect.arrayContaining([
                'bg-muted',
                'dark:glass-button',
                'dark:glass-edge',
                'rounded-full',
            ]),
        );
    });

    it('lights the edge of every glass layer', () => {
        expect(controlLayer.split(' ')).toContain('glass-edge');
        expect(floatingSurface.split(' ')).toContain('glass-edge');
        expect(glassBubble.split(' ')).toEqual(['glass-button', 'glass-edge']);
    });

    it('drops the lit edge of a nested surface, so glass inside glass draws no second contour', () => {
        expect(nestedSurfaceReset).toContain(
            'nested-surface:[box-shadow:none]',
        );
    });

    it('stops a nested surface from blurring through the glass utilities', () => {
        expect(nestedSurfaceReset).toContain(
            'nested-surface:[backdrop-filter:none]',
        );
    });
});

describe('the floating panels', () => {
    const panels = [
        'src/components/ui/popover.tsx',
        'src/components/ui/hover-card.tsx',
        'src/components/ui/navigation-menu.tsx',
        'src/components/ui/select.tsx',
    ];

    it.each(panels)('%s takes its fill from the panel glass', (file) => {
        const source = readFileSync(
            fileURLToPath(new URL(`../${file}`, import.meta.url)),
            'utf8',
        );

        expect(source).not.toMatch(/bg-popover\/\d+/);
    });
});

describe('the blur', () => {
    function sources(dir: string): string[] {
        return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
            const path = `${dir}/${entry.name}`;

            if (entry.isDirectory()) {
                return sources(path);
            }

            return /\.tsx?$/.test(entry.name) &&
                !/\.test\.tsx?$/.test(entry.name)
                ? [path]
                : [];
        });
    }

    it('comes only from the glass utilities', () => {
        const root = fileURLToPath(new URL('../src', import.meta.url));
        const blurring = sources(root).filter((file) =>
            /backdrop-blur-(?!none)/.test(readFileSync(file, 'utf8')),
        );

        expect(blurring.map((file) => file.slice(root.length + 1))).toEqual([]);
    });
});

describe('the glass outline', () => {
    it('draws floating panels and bars with the approved glass ring', () => {
        expect(floatingSurface).toContain('ring-(color:--glass-button-ring)');
        expect(controlLayer).toContain('ring-(color:--glass-button-ring)');
    });
});
