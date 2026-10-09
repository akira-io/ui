// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { TourProgress } from '@/blocks/tour/types';

import {
    addTarget,
    clickNext,
    elapse,
    mount,
    Page,
    popover,
    settle,
    TARGET_WAIT,
    tour,
    TRANSITION,
} from '../../../tests/helpers/tour';

beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = () => {};
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    document.body.innerHTML = '';
});

describe('a tour whose targets render late', () => {
    it('waits for the first target before showing the first step', async () => {
        mount(tour('late', ['a', 'b']), ['b']);
        await elapse(TRANSITION);

        await act(async () => {
            addTarget('a');
        });
        await elapse(TRANSITION);

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 2' });
    });

    it('keeps a later step whose target renders while the tour waits', async () => {
        mount(tour('late-middle', ['a', 'b', 'c']), ['a', 'b']);
        await elapse(TARGET_WAIT / 2);

        await act(async () => {
            addTarget('c');
        });
        await elapse(TRANSITION);

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 3' });

        await clickNext();
        await clickNext();

        expect(popover()).toMatchObject({ title: 'c', progress: '3 of 3' });
    });

    it('starts from the first step it can show', async () => {
        mount(tour('first-missing', ['a', 'b', 'c']), ['b', 'c']);
        await settle();

        expect(popover()).toMatchObject({ title: 'b', progress: '1 of 2' });

        await clickNext();

        expect(popover()).toMatchObject({ title: 'c', progress: '2 of 2' });
    });
});

describe('a provider that renders again while the tour waits', () => {
    it('starts the tour when the original wait runs out', async () => {
        const reports: TourProgress[] = [];
        const definition = tour('steady', ['a', 'b']);
        addTarget('a');

        const { rerender } = render(
            <Page definition={definition} reports={reports} />,
        );
        await elapse(TARGET_WAIT / 2);

        rerender(<Page definition={definition} reports={reports} />);
        await elapse(TARGET_WAIT / 2 + TRANSITION);

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 1' });
    });
});

describe('a tour that has nothing to show', () => {
    it('does not start and records nothing', async () => {
        const { reports } = mount(tour('empty', ['a', 'b']), []);
        await settle();

        expect(popover()).toBeNull();
        expect(reports).toEqual([]);
    });

    it('does not start once the page that asked for it is gone', async () => {
        const { reports, leavePage } = mount(tour('left', ['a', 'b']), ['a']);
        await elapse(TRANSITION);

        leavePage();
        await settle();

        expect(popover()).toBeNull();
        expect(reports).toEqual([]);
    });

    it('does not start once the provider is gone', async () => {
        const { reports, unmount } = mount(tour('gone', ['a', 'b']), ['a']);
        await elapse(TRANSITION);

        unmount();
        await settle();

        expect(popover()).toBeNull();
        expect(reports).toEqual([]);
    });
});
