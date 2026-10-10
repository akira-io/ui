// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    GlassPillAction,
    GlassPillGroup,
    GlassToolbar,
} from '@/components/ui/glass-toolbar';

afterEach(cleanup);

function Toolbar({ onArchive = vi.fn() }: { onArchive?: () => void }) {
    return (
        <GlassToolbar label="Message actions">
            <GlassPillGroup>
                <GlassPillAction
                    icon={<span>A</span>}
                    label="Archive"
                    onClick={onArchive}
                />
                <GlassPillAction icon={<span>M</span>} label="Move" disabled />
            </GlassPillGroup>
            <GlassPillGroup>
                <GlassPillAction icon={<span>R</span>} label="Reply" asChild>
                    <a href="/reply" />
                </GlassPillAction>
            </GlassPillGroup>
        </GlassToolbar>
    );
}

describe('GlassToolbar', () => {
    it('is a named toolbar of named actions with icons hidden from assistive tech', () => {
        render(<Toolbar />);

        expect(
            screen.getByRole('toolbar', { name: 'Message actions' }),
        ).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Archive' })).toBeTruthy();
        expect(
            screen.getByRole('link', { name: 'Reply' }).getAttribute('href'),
        ).toBe('/reply');
        expect(
            document.querySelectorAll('[data-slot="glass-pill-group"]'),
        ).toHaveLength(2);
    });

    it('runs an action on a plain tap', async () => {
        const user = userEvent.setup();
        const onArchive = vi.fn();
        render(<Toolbar onArchive={onArchive} />);

        await user.click(screen.getByRole('button', { name: 'Archive' }));

        expect(onArchive).toHaveBeenCalledTimes(1);
    });

    it('takes one tab stop and moves across groups with the arrows, skipping disabled actions', async () => {
        const user = userEvent.setup();
        render(<Toolbar />);

        const archive = screen.getByRole('button', { name: 'Archive' });
        const reply = screen.getByRole('link', { name: 'Reply' });

        expect(archive.tabIndex).toBe(0);
        expect(reply.tabIndex).toBe(-1);

        archive.focus();
        await user.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(reply);
        expect(reply.tabIndex).toBe(0);
        expect(archive.tabIndex).toBe(-1);
        await user.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(archive);
        await user.keyboard('{End}');
        expect(document.activeElement).toBe(reply);
        await user.keyboard('{Home}');
        expect(document.activeElement).toBe(archive);
    });

    it('floats at the bottom when asked', () => {
        render(
            <GlassToolbar label="Actions" floating>
                <GlassPillGroup>
                    <GlassPillAction icon={<span>A</span>} label="Archive" />
                </GlassPillGroup>
            </GlassToolbar>,
        );

        expect(screen.getByRole('toolbar').className).toContain('fixed');
    });

    it('keeps a hidden highlight in each group', () => {
        render(<Toolbar />);

        const highlight = document.querySelector<HTMLElement>(
            '[data-slot="glass-pill-highlight"]',
        );

        expect(highlight?.getAttribute('aria-hidden')).toBe('true');
        expect(highlight?.className).toContain('opacity-0');
    });
});
