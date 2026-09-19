// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { TwoFactorScanStep } from '@/blocks/two-factor/scan-step';

afterEach(() => {
    cleanup();
});

const key = 'JBSWY3DPEHPK3PXP';

function slot(name: string): HTMLElement | null {
    return document.querySelector(`[data-slot="${name}"]`);
}

describe('the two factor scan step', () => {
    it.each([
        [
            'a node',
            { qrCode: <svg role="img" aria-label="qr" className="size-40" /> },
        ],
        ['markup', { qrCodeSvg: "<svg role='img' aria-label='qr'></svg>" }],
    ])(
        'holds a qr code passed as %s at a fixed size on a light frame',
        (_, qr) => {
            render(<TwoFactorScanStep {...qr} />);

            const frame = slot('two-factor-qr-frame');

            expect(frame?.querySelector('svg')).not.toBeNull();
            expect(frame?.className).toContain('size-44');
            expect(frame?.className).toMatch(/\bbg-white\b/);
            expect(frame?.className).toContain('p-3');
        },
    );

    it('leaves the size of the qr svg to the app', () => {
        render(
            <TwoFactorScanStep
                qrCode={<svg role="img" aria-label="qr" className="size-40" />}
            />,
        );

        const panel = slot('two-factor-qr');

        expect(panel?.className).not.toContain('size-full');
        expect(slot('two-factor-qr-frame')?.className).not.toContain(
            '[&_svg]:size-full',
        );
        expect(panel?.querySelector('svg')?.getAttribute('class')).toBe(
            'size-40',
        );
    });

    it('falls back to a message when the app has no qr code yet', () => {
        render(<TwoFactorScanStep manualSetupKey={key} />);

        expect(slot('two-factor-qr-frame')).toBeNull();
        expect(
            screen.getByText('The QR code is not available yet.'),
        ).not.toBeNull();
    });

    it('shows the setup key as one read only field labelled by the field primitives', () => {
        render(<TwoFactorScanStep manualSetupKey={key} />);

        const group = screen.getByRole('group', { name: 'Setup key' });
        const row = slot('two-factor-setup-key-field');

        expect(group.contains(row)).toBe(true);
        expect(group.getAttribute('aria-describedby')).toBe(
            slot('field-description')?.id,
        );
        expect(row?.className).toContain('h-11');
        expect(row?.className).toContain('rounded-2xl');
        expect(slot('two-factor-setup-key-value')?.className).toContain(
            'truncate',
        );
    });

    it('toggles the setup key through an icon button that reports its state', async () => {
        const user = userEvent.setup();

        render(<TwoFactorScanStep manualSetupKey={key} />);

        const toggle = screen.getByRole('button', { name: 'Show setup key' });

        expect(toggle.getAttribute('aria-pressed')).toBe('false');
        expect(toggle.textContent).toBe('');
        expect(slot('two-factor-setup-key-value')?.textContent).not.toContain(
            key,
        );

        await user.click(toggle);

        expect(toggle.getAttribute('aria-pressed')).toBe('true');
        expect(toggle.getAttribute('aria-label')).toBe('Hide setup key');
        expect(slot('two-factor-setup-key-value')?.textContent).toBe(key);
    });

    it('sizes the reveal and copy buttons alike', () => {
        render(<TwoFactorScanStep manualSetupKey={key} />);

        const toggle = screen.getByRole('button', { name: 'Show setup key' });
        const copy = screen.getByRole('button', { name: 'Copy' });

        expect(toggle.getAttribute('data-size')).toBe(
            copy.getAttribute('data-size'),
        );
        expect(toggle.getAttribute('data-size')).toBe('icon-sm');
    });
});
