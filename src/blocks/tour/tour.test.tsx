// @vitest-environment jsdom

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { forgetRecordedVersions } from '@/blocks/tour/recorded-versions';
import {
    clickNext,
    elapse,
    mount,
    mountTwice,
    popover,
    settle,
    tour,
    TRANSITION,
} from '../../../tests/helpers/tour';

beforeEach(() => {
    vi.useFakeTimers();
    Element.prototype.scrollIntoView = () => {};
});

afterEach(() => {
    cleanup();
    forgetRecordedVersions();
    vi.useRealTimers();
    document.body.innerHTML = '';
});

describe('a tour whose middle step has no target on the page', () => {
    const fiveSteps = tour('report', ['a', 'b', 'c', 'd', 'e']);

    it('counts only the steps it can show', async () => {
        mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await settle();

        expect(popover()).toMatchObject({ title: 'a', progress: '1 of 4' });

        await clickNext();
        await clickNext();

        expect(popover()).toMatchObject({ title: 'c', progress: '3 of 4' });
    });

    it('moves past the missing step on the next click', async () => {
        mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await settle();

        await clickNext();
        await clickNext();
        await clickNext();

        expect(popover()).toEqual({
            title: 'e',
            progress: '4 of 4',
            next: 'Done',
        });
    });

    it('records the tour as completed after the last step shown', async () => {
        const { reports } = mount(fiveSteps, ['a', 'b', 'c', 'e']);
        await settle();

        for (let click = 0; click < 4; click++) {
            await clickNext();
        }

        expect(popover()).toBeNull();
        expect(reports).toEqual([
            { tour: 'report', version: 1, lastStep: 3, outcome: 'completed' },
        ]);
    });
});

describe('a tour whose last steps have no target on the page', () => {
    const sevenSteps = tour('ticket', ['a', 'b', 'c', 'd', 'e', 'f', 'g']);

    it('offers to finish on the last step it can show', async () => {
        mount(sevenSteps, ['a', 'b', 'c', 'd', 'e']);
        await settle();

        for (let click = 0; click < 4; click++) {
            await clickNext();
        }

        expect(popover()).toEqual({
            title: 'e',
            progress: '5 of 5',
            next: 'Done',
        });
    });

    it('closes and records the tour as completed on Done', async () => {
        const { reports } = mount(sevenSteps, ['a', 'b', 'c', 'd', 'e']);
        await settle();

        for (let click = 0; click < 5; click++) {
            await clickNext();
        }

        expect(popover()).toBeNull();
        expect(reports).toEqual([
            { tour: 'ticket', version: 1, lastStep: 4, outcome: 'completed' },
        ]);
    });

    it('closes on Done when only the first step can be shown', async () => {
        const { reports } = mount(tour('travel', ['a', 'b', 'c', 'd', 'e']), [
            'a',
        ]);
        await settle();

        expect(popover()).toEqual({
            title: 'a',
            progress: '1 of 1',
            next: 'Done',
        });

        await clickNext();

        expect(popover()).toBeNull();
        expect(reports).toEqual([
            { tour: 'travel', version: 1, lastStep: 0, outcome: 'completed' },
        ]);
    });
});

describe('a tour whose target disappears while it runs', () => {
    it('counts only the steps still on the page', async () => {
        mount(tour('shrinking', ['a', 'b', 'c']), ['a', 'b', 'c']);
        await settle();

        document.querySelector('[data-tour="b"]')?.remove();
        await clickNext();

        expect(popover()).toMatchObject({ title: 'c', progress: '2 of 2' });
    });
});

describe('two components asking for the same waiting tour', () => {
    it('starts it when the second one goes away', async () => {
        const { leavePage } = mountTwice(tour('shared', ['a', 'b']), ['a']);
        await elapse(TRANSITION);

        leavePage();
        await settle();

        expect(popover()).toMatchObject({ title: 'a' });
    });
});
