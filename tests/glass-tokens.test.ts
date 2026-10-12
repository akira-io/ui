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
    recessedSurface,
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
                'bg-(--field-fill)',
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

describe('the solid card fill', () => {
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

    it('paints no component over its glass', () => {
        const root = fileURLToPath(new URL('../src', import.meta.url));
        const solid = sources(root).filter((file) =>
            /(^|[\s'"`])bg-card(?![\w-])/.test(readFileSync(file, 'utf8')),
        );

        expect(solid.map((file) => file.slice(root.length + 1))).toEqual([]);
    });

    it('leaves the back card of a stack without a fill or a lit edge', () => {
        expect(recessedSurface.split(' ')).toEqual(
            expect.arrayContaining(['bg-transparent', '[box-shadow:none]']),
        );
    });
});

describe('the field fill', () => {
    it('stays gray over any surface in light mode, glass included', () => {
        expect(fieldSurface.split(' ')).toContain('bg-(--field-fill)');
        expect(fieldSurface.split(' ')).not.toContain('bg-muted');
    });

    it('uses the translucent tertiary fill Apple gives its fields', () => {
        const css = readFileSync(
            fileURLToPath(new URL('../glass.css', import.meta.url)),
            'utf8',
        );

        expect(css).toMatch(/--field-fill:\s*rgb\(118 118 128 \/ 0\.12\)/);
    });
});

describe('the elevation of a content card', () => {
    const theme = readFileSync(
        fileURLToPath(new URL('../theme.css', import.meta.url)),
        'utf8',
    );

    it('lifts a card off the page with a short contact shadow, not the float of a menu', () => {
        expect(elevatedSurface).toContain('shadow-(--glass-content-elevation)');
        expect(elevatedSurface).not.toContain('shadow-(--glass-elevation)');
        expect(floatingSurface).toContain('shadow-(--glass-elevation)');
    });

    it('defines the content elevation in light and in dark', () => {
        expect(theme.match(/--glass-content-elevation:/g)).toHaveLength(2);
        expect(theme).toMatch(
            /--glass-content-elevation:[^;]*0 1px 3px 0 oklch\(0 0 0 \/ 0\.06\)[^;]*0 6px 16px -6px oklch\(0 0 0 \/ 0\.09\)/,
        );
    });
});
