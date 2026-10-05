// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TwoFactorChallenge } from '@/blocks/two-factor/challenge';

import { drainInputOtpTimersSurvivingUnmount } from '../../../tests/fixtures/input-otp';

afterEach(async () => {
    cleanup();
    await drainInputOtpTimersSurvivingUnmount();
});

class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

globalThis.ResizeObserver ??=
    ResizeObserverStub as unknown as typeof ResizeObserver;

document.elementFromPoint ??= () => null;

function header(container: HTMLElement): HTMLElement {
    const element = container.querySelector<HTMLElement>(
        '[data-slot="two-factor-challenge-header"]',
    );

    if (!element) {
        throw new Error('The challenge header is missing.');
    }

    return element;
}

describe('the two-factor challenge', () => {
    it('centres the heading over the code field', () => {
        const { container } = render(
            <TwoFactorChallenge onSubmit={() => {}} />,
        );

        expect(header(container).className).toContain('text-center');
    });
});
