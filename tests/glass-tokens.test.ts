import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
    controlLayer,
    elevatedSurface,
    floatingSurface,
    glassControl,
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

    it('keeps content and in-content controls solid', () => {
        expect(elevatedSurface).not.toContain('backdrop-');
        expect(glassControl).not.toContain('backdrop-');
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
