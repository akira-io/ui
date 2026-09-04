// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Dropzone } from '@/components/ui/dropzone';

import { dragging, droppedFile } from '../../../tests/fixtures/dropzone';

afterEach(cleanup);

function area(): HTMLElement {
    return screen
        .getByTestId('zone')
        .querySelector<HTMLElement>('[data-slot="dropzone-area"]')!;
}

describe('a drag crossing the zone', () => {
    function child(): HTMLElement {
        return area().querySelector<HTMLElement>('p')!;
    }

    it('highlights the zone on entry', async () => {
        render(<Dropzone data-testid="zone" />);

        fireEvent.dragEnter(
            area(),
            dragging([droppedFile('a.pdf', 'application/pdf')]),
        );

        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));
    });

    it('keeps the highlight when the pointer crosses a child element', async () => {
        render(<Dropzone data-testid="zone" />);

        const dragged = dragging([droppedFile('a.pdf', 'application/pdf')]);

        fireEvent.dragEnter(area(), dragged);
        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));

        fireEvent.dragEnter(child(), dragged);
        fireEvent.dragLeave(child(), dragged);

        await Promise.resolve();
        expect(area().dataset.dragActive).toBe('true');
    });

    it('drops the highlight once the pointer leaves the zone, so the assertion above is not vacuous', async () => {
        render(<Dropzone data-testid="zone" />);

        const dragged = dragging([droppedFile('a.pdf', 'application/pdf')]);

        fireEvent.dragEnter(area(), dragged);
        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));

        fireEvent.dragLeave(area(), dragged);

        await waitFor(() => expect(area().dataset.dragActive).toBeUndefined());
    });
});

describe('the trigger', () => {
    function clicksOnTheInput(): { count: () => number } {
        const input = area().querySelector<HTMLInputElement>(
            '[data-slot="dropzone-input"]',
        )!;
        let clicks = 0;

        input.addEventListener('click', () => {
            clicks += 1;
        });

        return { count: () => clicks };
    }

    it('opens the file dialog once, not once per bubbling handler', () => {
        render(<Dropzone data-testid="zone" />);

        const clicks = clicksOnTheInput();

        fireEvent.click(screen.getByText('Choose a file'));

        expect(clicks.count()).toBe(1);
    });

    it('opens it from the zone around the trigger too', () => {
        render(<Dropzone data-testid="zone" />);

        const clicks = clicksOnTheInput();

        fireEvent.click(screen.getByText('Drag a file here'));

        expect(clicks.count()).toBe(1);
    });

    it('opens nothing while the zone is disabled', () => {
        render(<Dropzone disabled data-testid="zone" />);

        const clicks = clicksOnTheInput();

        fireEvent.click(screen.getByText('Drag a file here'));

        expect(clicks.count()).toBe(0);
    });
});
