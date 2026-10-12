// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Hash } from 'lucide-react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { InfoField } from '../src/blocks/info-field';
import { NotificationBell } from '../src/blocks/notification-bell';
import { ConfirmDialog } from '../src/components/ui/confirm-dialog';
import { EmptyState } from '../src/components/ui/empty-state';
import { glassBubble, iconTile } from '../src/lib/language';

afterEach(cleanup);

const TILE_FILES = [
    'src/blocks/info-field.tsx',
    'src/blocks/stat-card-parts.tsx',
    'src/blocks/settings-card.tsx',
    'src/blocks/settings-page.tsx',
    'src/blocks/danger-zone.tsx',
    'src/blocks/passkeys/item.tsx',
    'src/components/ui/alert-dialog.tsx',
    'src/components/ui/empty-state.tsx',
    'src/components/ui/command.tsx',
];

function source(file: string): string {
    return readFileSync(resolve(process.cwd(), file), 'utf8');
}

describe('an icon tile', () => {
    it('takes the rounded square of an app icon, whatever its size', () => {
        expect(iconTile.split(' ')).toContain('rounded-[22%]');
    });

    it('is drawn in the same glass as a button', () => {
        expect(iconTile.split(' ')).toEqual(
            expect.arrayContaining(glassBubble.split(' ')),
        );
    });

    it.each(TILE_FILES.map((file) => [file]))('sits on glass in %s', (file) => {
        const text = source(file);

        expect(text).toContain('iconTile');
        expect(text).not.toMatch(
            /iconTile,\s*\n?\s*'[^']*rounded-(full|xl|2xl)/,
        );
        expect(text).not.toMatch(
            /bg-surface-recessed|'bg-muted text-muted-foreground'|bg-primary\/10 text-primary|bg-destructive\/10 text-destructive/,
        );
    });

    it('wraps the icon of an info field in glass', () => {
        const { container } = render(
            <InfoField icon={Hash} label="Customer" value="cus_4821" />,
        );

        const tile = container.querySelector('svg')!.parentElement!;

        expect(tile.className).toContain('glass-button');
        expect(tile.className).not.toContain('bg-muted');
    });

    it('wraps the icon of an empty state in glass', () => {
        const { container } = render(<EmptyState scene="empty" />);

        expect(
            container.querySelector('[data-slot="empty-state-icon"]')!
                .className,
        ).toContain('glass-button');
    });
});

describe('a standalone icon button', () => {
    it('opens the notifications from a glass bubble', () => {
        render(
            <NotificationBell
                items={[]}
                unread={2}
                onMarkRead={() => {}}
                onMarkAllRead={() => {}}
            />,
        );

        expect(screen.getAllByRole('button')[0]!.className).toContain(
            'glass-button',
        );
    });

    it.each([
        ['src/components/ui/sidebar.tsx'],
        ['src/components/ui/data-table-row-actions.tsx'],
        ['src/blocks/passkeys/item.tsx'],
    ])('stays on glass in %s', (file) => {
        expect(source(file)).not.toMatch(
            /variant="ghost"\s+size="icon"\s+(className="(h-7 w-7|size-8 rounded-xl|text-destructive))?/,
        );
    });
});

describe('the icon of a confirm dialog', () => {
    it.each([
        ['destructive', 'text-destructive'],
        ['default', 'text-primary'],
    ] as const)(
        'sits on glass and only the %s icon takes its colour',
        (variant, colour) => {
            render(
                <ConfirmDialog
                    open
                    onOpenChange={() => {}}
                    onConfirm={() => {}}
                    variant={variant}
                    title="Disable two-factor authentication"
                />,
            );

            const tile = document.querySelector(
                '[data-slot="confirm-dialog-icon"]',
            )!;

            expect(tile.className).toContain('glass-button');
            expect(tile.className).toContain(colour);
            expect(tile.className).not.toMatch(/\bbg-(destructive|primary)\b/);
        },
    );
});
