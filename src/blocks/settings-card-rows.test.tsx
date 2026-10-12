// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { ShieldCheck } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { SettingsCard, SettingsPanel, ToggleRow } from '@/blocks/settings-card';

afterEach(cleanup);

function card() {
    return render(
        <SettingsCard icon={ShieldCheck} title="Security" description="Rules">
            <SettingsPanel title="Sign in">
                <ToggleRow
                    id="a"
                    label="Require two-factor"
                    checked
                    onChange={() => {}}
                />
                <ToggleRow
                    id="b"
                    label="Allow passkeys"
                    checked
                    onChange={() => {}}
                />
            </SettingsPanel>
            <ToggleRow
                id="c"
                label="Restrict by IP"
                checked={false}
                onChange={() => {}}
            />
        </SettingsCard>,
    ).container;
}

describe('the rows of a settings card', () => {
    it('part the controls of a panel with hairlines, as a macOS settings group', () => {
        const rows = card().querySelector('[data-slot="settings-panel-rows"]')!;

        expect(rows.className).toContain('divide-y');
        expect(rows.className).toContain('divide-border/60');
        expect(rows.children).toHaveLength(2);
    });

    it('part the panels and loose rows of the card the same way', () => {
        const rows = card().querySelector('[data-slot="settings-card-rows"]')!;

        expect(rows.className).toContain('divide-y');
        expect(rows.children).toHaveLength(2);
    });

    it('pad each toggle row like every other settings row', () => {
        for (const row of card().querySelectorAll(
            '[data-slot="settings-toggle-row"]',
        )) {
            expect(row.className).toContain('py-item');
        }
    });

    it('gives a panel in the card the same breathing room as a row, so its title clears the hairline', () => {
        const rows = card().querySelector('[data-slot="settings-card-rows"]')!;

        expect(rows.className).toContain(
            '[&>[data-slot=settings-panel]]:py-row',
        );
    });
});
