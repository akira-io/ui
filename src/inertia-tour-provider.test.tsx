/** @vitest-environment jsdom */

import { act, cleanup, render } from '@testing-library/react';
import { useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const inertia = vi.hoisted(() => ({
    flushAll: vi.fn(),
    auth: { user: { id: 1 } } as { user: { id: number } | null } | undefined,
}));

vi.mock('@inertiajs/react', () => ({
    Form: () => null,
    Link: () => null,
    router: { visit: vi.fn(), flushAll: inertia.flushAll },
    usePage: () => ({
        url: '/',
        props: inertia.auth ? { tours: {}, auth: inertia.auth } : { tours: {} },
    }),
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

function StartOnMount(): null {
    const { startTour } = useTourController();

    useEffect(() => startTour(roles), [startTour]);

    return null;
}

function title(): string | null | undefined {
    return document.querySelector('.driver-popover-title')?.textContent;
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
    inertia.auth = { user: { id: 1 } };
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

    it('starts a tour again for the next user signed in without a reload', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        unmount();
        inertia.auth = { user: { id: 2 } };
        mountProvider();
        await run(() => start(roles));

        expect(
            document.querySelector('.driver-popover-title')?.textContent,
        ).toBe('a');
    });

    it('keeps a closed tour closed for the same user on the next page', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        unmount();
        mountProvider();
        await run(() => start(roles));

        expect(document.querySelector('.driver-popover-title')).toBeNull();
    });

    it('starts a tour again once the user signs out', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        unmount();
        inertia.auth = { user: null };
        mountProvider();
        await run(() => start(roles));

        expect(document.querySelector('.driver-popover-title')).not.toBeNull();
    });

    it('keeps a closed tour closed on a page that does not share auth', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        unmount();
        inertia.auth = undefined;
        mountProvider();
        await run(() => start(roles));

        expect(document.querySelector('.driver-popover-title')).toBeNull();
    });

    it('starts a tour for the next user from a child that starts it on mount', async () => {
        const { unmount } = mountProvider();

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        unmount();
        inertia.auth = { user: { id: 2 } };
        await run(() =>
            render(
                <InertiaTourProvider progressUrl={(tour) => `/tours/${tour}`}>
                    <StartOnMount />
                </InertiaTourProvider>,
            ),
        );

        expect(title()).toBe('a');
    });

    it('starts a tour for the next user in a layout that stays mounted', async () => {
        const page = (
            <InertiaTourProvider progressUrl={(tour) => `/tours/${tour}`}>
                <Controller />
            </InertiaTourProvider>
        );
        const { rerender } = render(page);

        await run(() => start(roles));
        await press('.driver-popover-close-btn');
        inertia.auth = { user: { id: 2 } };
        rerender(
            <InertiaTourProvider progressUrl={(tour) => `/tours/${tour}`}>
                <Controller />
            </InertiaTourProvider>,
        );
        await run(() => start(roles));

        expect(title()).toBe('a');
    });
});
