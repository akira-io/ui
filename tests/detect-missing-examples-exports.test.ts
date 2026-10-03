import { describe, expect, it } from 'vitest';
import {
    exportedValues,
    isReportable,
    moduleOf,
} from '../scripts/detect-missing-examples.mjs';

const UI_ROOT = new URL('..', import.meta.url).pathname;

describe('isReportable', () => {
    it.each(['Button', 'DropdownMenuSub', 'useSidebar', 'useUiLocale'])(
        'keeps %s',
        (name) => {
            expect(isReportable(name)).toBe(true);
        },
    );

    it.each([
        'DialogPortal',
        'AlertDialogOverlay',
        'AUTOSAVE_DELAY',
        'CHART_PALETTE',
        'buttonVariants',
        'cn',
        'user',
    ])('skips %s', (name) => {
        expect(isReportable(name)).toBe(false);
    });
});

describe('moduleOf', () => {
    it.each([
        ['components/ui/button.tsx', 'components', 'button'],
        ['components/ui/editor/toolbar.tsx', 'components', 'editor'],
        ['blocks/date-filter/types.ts', 'blocks', 'date-filter'],
        ['blocks/login-form/index.ts', 'blocks', 'login-form'],
        ['shells/auth-shell.tsx', 'shells', 'auth-shell'],
        ['hooks/use-mobile.tsx', 'hooks', 'use-mobile'],
        ['locales/context.tsx', 'locales', 'context'],
    ])('places %s under %s/%s', (path, group, slug) => {
        expect(moduleOf(path)).toEqual({ group, slug });
    });
});

describe('exportedValues on the package itself', () => {
    const values = exportedValues(UI_ROOT);
    const names = values.map((value) => value.symbol);

    it('resolves the components behind export *', () => {
        expect(values).toContainEqual({
            group: 'components',
            slug: 'button',
            symbol: 'Button',
            specifier: '@akira-io/ui',
        });
    });

    it('reaches the hooks and locales the old prefix check skipped', () => {
        expect(names).toContain('useConfirmDialog');
        expect(names).toContain('useUiLocale');
    });

    it('never lists a type-only export', () => {
        expect(names).not.toContain('ButtonProps');
        expect(names).not.toContain('SurfaceProps');
    });

    it('lists a symbol two entries share only once', () => {
        expect(names.filter((name) => name === 'useUiLocale')).toHaveLength(1);
    });
});
