/** @vitest-environment jsdom */

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const inertia = vi.hoisted(() => ({ flushAll: vi.fn() }));

vi.mock('@inertiajs/react', () => ({
    Form: () => null,
    Link: () => null,
    router: { visit: vi.fn(), flushAll: inertia.flushAll },
    usePage: () => ({ url: '/', props: { tours: {} } }),
    usePoll: vi.fn(),
}));

import { useTourController } from '@/blocks/tour';
import { forgetRecordedVersions } from '@/blocks/tour/recorded-versions';
import { InertiaTourProvider } from '@/inertia';

const TRANSITION = 500;

const roles = {
    id: 'roles',
    version: 1,
    steps: ['a', 'b'].map((name) => ({
        target: `[data-tour="${name}"]`,
        title: name,
        description: name,
    })),
};

let start: ReturnType<typeof useTourController>['startTour'] = () => () => {};

function Controller(): null {
    start = useTourController().startTour;

    return null;
}

let respond: () => void = () => {};

function mountProvider(): { unmount: () => void } {
    return render(
        <InertiaTourProvider progressUrl={(tour) => `/tours/${tour}`}>
            <Controller />
        </InertiaTourProvider>,
    );
}

async function press(selector: string): Promise<void> {
    await run(() =>
        document.querySelector<HTMLButtonElement>(selector)?.click(),
    );
}

async function run(callback: () => void): Promise<void> {
    await act(async () => {
        callback();
        await vi.advanceTimersByTimeAsync(TRANSITION);
    });
}

beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = () => {};
    vi.stubGlobal(
        'fetch',
        vi.fn(
            () =>
                new Promise<Response>((resolve) => {
                    respond = () => resolve(new Response());
                }),
        ),
    );

    ['a', 'b'].forEach((name) => {
        const element = document.createElement('div');
        element.dataset.tour = name;
        document.body.appendChild(element);
    });
});

afterEach(() => {
    cleanup();
    forgetRecordedVersions();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    document.body.innerHTML = '';
});

describe('the Inertia tour provider', () => {
    it('drops the prefetched pages once a skipped tour is saved', async () => {
        mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');

        expect(fetch).toHaveBeenCalledWith('/tours/roles', expect.anything());
        expect(inertia.flushAll).not.toHaveBeenCalled();

        await run(() => respond());

        expect(inertia.flushAll).toHaveBeenCalledOnce();
    });

    it('drops the prefetched pages once a completed tour is saved', async () => {
        mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-next-btn');
        await press('.driver-popover-next-btn');
        await run(() => respond());

        expect(inertia.flushAll).toHaveBeenCalledOnce();
    });

    it('keeps the prefetched pages when a tour is only dismissed', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        unmount();
        await run(() => respond());

        expect(fetch).toHaveBeenCalledOnce();
        expect(inertia.flushAll).not.toHaveBeenCalled();
    });
});
