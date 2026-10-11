import { describe, expect, it } from 'vitest';

import { scaleViolations } from './helpers/hig-scale';
import { componentSources, readSource } from './helpers/sources';

const HIG_SCALE_PENDING = new Set<string>([
    'src/blocks/brand-logo.tsx',
    'src/blocks/command-palette.tsx',
    'src/blocks/composition-bar.tsx',
    'src/blocks/danger-zone.tsx',
    'src/blocks/date-filter/date-filter.tsx',
    'src/blocks/date-filter/fixed-panel.tsx',
    'src/blocks/date-filter/relative-panel.tsx',
    'src/blocks/form-dialog.tsx',
    'src/blocks/form-overlay.tsx',
    'src/blocks/info-field.tsx',
    'src/blocks/localized-fields.tsx',
    'src/blocks/login-form/parts.tsx',
    'src/blocks/notification-bell.tsx',
    'src/blocks/passkeys/item.tsx',
    'src/blocks/passkeys/list.tsx',
    'src/blocks/passkeys/register-button.tsx',
    'src/blocks/passkeys/sign-in-button.tsx',
    'src/blocks/section-header.tsx',
    'src/blocks/settings-card.tsx',
    'src/blocks/settings-fields.tsx',
    'src/blocks/settings-page.tsx',
    'src/blocks/share-tooltip.tsx',
    'src/blocks/stat-breakdown-card.tsx',
    'src/blocks/stat-card-parts.tsx',
    'src/blocks/stat-card.tsx',
    'src/blocks/two-factor/challenge.tsx',
    'src/blocks/two-factor/recovery-codes.tsx',
    'src/blocks/two-factor/scan-step.tsx',
    'src/blocks/two-factor/setup-dialog.tsx',
    'src/blocks/two-factor/verify-form.tsx',
    'src/components/ui/accordion.tsx',
    'src/components/ui/action-morph-form.tsx',
    'src/components/ui/action-morph-menu.tsx',
    'src/components/ui/action-morph.tsx',
    'src/components/ui/alert-dialog.tsx',
    'src/components/ui/alert.tsx',
    'src/components/ui/badge.tsx',
    'src/components/ui/breadcrumb.tsx',
    'src/components/ui/button-variants.ts',
    'src/components/ui/calendar-popover.tsx',
    'src/components/ui/calendar.tsx',
    'src/components/ui/carousel.tsx',
    'src/components/ui/chart-category.tsx',
    'src/components/ui/chart-container.tsx',
    'src/components/ui/chart.tsx',
    'src/components/ui/code-block-header.tsx',
    'src/components/ui/code-block.tsx',
    'src/components/ui/code.tsx',
    'src/components/ui/combobox.tsx',
    'src/components/ui/command.tsx',
    'src/components/ui/confirm-dialog.tsx',
    'src/components/ui/context-menu-sub.tsx',
    'src/components/ui/context-menu.tsx',
    'src/components/ui/data-table-faceted-filter.tsx',
    'src/components/ui/data-table-header.tsx',
    'src/components/ui/data-table-pagination.tsx',
    'src/components/ui/data-table-toolbar.tsx',
    'src/components/ui/data-table.tsx',
    'src/components/ui/date-picker.tsx',
    'src/components/ui/date-range-filter.tsx',
    'src/components/ui/date-time-picker.tsx',
    'src/components/ui/dialog.tsx',
    'src/components/ui/donut-chart.tsx',
    'src/components/ui/drawer.tsx',
    'src/components/ui/dropdown-menu-sub.tsx',
    'src/components/ui/dropdown-menu.tsx',
    'src/components/ui/dropzone-file-list.tsx',
    'src/components/ui/dropzone.tsx',
    'src/components/ui/editor/editor.tsx',
    'src/components/ui/editor/link.tsx',
    'src/components/ui/editor/prose.ts',
    'src/components/ui/editor/rich-text-editor.tsx',
    'src/components/ui/editor/toolbar.tsx',
    'src/components/ui/empty-state.tsx',
    'src/components/ui/field-error.tsx',
    'src/components/ui/field.tsx',
    'src/components/ui/floating-sheet-panel.tsx',
    'src/components/ui/floating-sheet.tsx',
    'src/components/ui/form.tsx',
    'src/components/ui/glass-toolbar.tsx',
    'src/components/ui/hover-card.tsx',
    'src/components/ui/input-otp.tsx',
    'src/components/ui/json-node.tsx',
    'src/components/ui/json-viewer.tsx',
    'src/components/ui/menubar-sub.tsx',
    'src/components/ui/menubar.tsx',
    'src/components/ui/navigation-menu.tsx',
    'src/components/ui/pagination.tsx',
    'src/components/ui/password-input.tsx',
    'src/components/ui/popover.tsx',
    'src/components/ui/save-status.tsx',
    'src/components/ui/select.tsx',
    'src/components/ui/sheet.tsx',
    'src/components/ui/table.tsx',
    'src/components/ui/tabs.tsx',
    'src/components/ui/time-columns.tsx',
    'src/components/ui/time-picker.tsx',
    'src/components/ui/time-segments.tsx',
    'src/components/ui/tooltip.tsx',
    'src/shells/app-content.tsx',
    'src/shells/auth-shell.tsx',
    'src/shells/heading.tsx',
    'src/shells/settings-layout.tsx',
    'src/shells/user-menu-content.tsx',
]);

const HIG_SCALE_PENDING_LIMIT = 109;

const files = componentSources();

const HIG_SCALE_GEOMETRY: Record<string, string[]> = {
    'src/components/ui/sidebar-menu.tsx': [
        'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    ],
    'src/components/ui/sidebar-menu-sub.tsx': ['mx-3.5'],
    'src/shells/nav-main-item.tsx': ['pr-10'],
    'src/shells/nav-sub-group.tsx': ['pr-9'],
};

function violationsIn(file: string): string[] {
    const geometry = HIG_SCALE_GEOMETRY[file] ?? [];

    return scaleViolations(readSource(file)).spacing.filter(
        (spacing) => !geometry.includes(spacing),
    );
}

describe('the HIG scale', () => {
    it.each(files.filter((file) => !HIG_SCALE_PENDING.has(file)))(
        '%s spaces itself with the tokens',
        (file) => {
            expect(violationsIn(file)).toEqual([]);
        },
    );

    it.each(files)('%s sizes its icons with the tokens', (file) => {
        expect(scaleViolations(readSource(file)).icon).toEqual([]);
    });

    it.each(Object.entries(HIG_SCALE_GEOMETRY))(
        '%s still needs its geometry offsets',
        (file, offsets) => {
            expect(scaleViolations(readSource(file)).spacing).toEqual(
                expect.arrayContaining(offsets),
            );
        },
    );

    it('only lets the pending list shrink', () => {
        expect(
            HIG_SCALE_PENDING.size,
            'a file was added to HIG_SCALE_PENDING: space it with the tokens instead',
        ).toBeLessThanOrEqual(HIG_SCALE_PENDING_LIMIT);
    });

    it.each([...HIG_SCALE_PENDING])('%s is still pending', (file) => {
        expect(
            violationsIn(file).length,
            `${file} already follows the scale: take it off HIG_SCALE_PENDING`,
        ).toBeGreaterThan(0);
    });
});
