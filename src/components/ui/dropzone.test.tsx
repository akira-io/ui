// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Dropzone } from '@/components/ui/dropzone';

import { dragging, droppedFile } from '../../../tests/fixtures/dropzone';

afterEach(cleanup);

function area(testId = 'zone'): HTMLElement {
    return screen
        .getByTestId(testId)
        .querySelector<HTMLElement>('[data-slot="dropzone-area"]')!;
}

function drop(files: File[], testId = 'zone'): void {
    fireEvent.drop(area(testId), dragging(files));
}

describe('a dropped file', () => {
    it('reaches the handler', async () => {
        const onFilesChange = vi.fn();

        render(<Dropzone data-testid="zone" onFilesChange={onFilesChange} />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);

        await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
        expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(
            ['invoice.pdf'],
        );
    });

    it('is named and measured in the zone', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf', 2 * 1024 * 1024)]);

        expect(await screen.findByText('invoice.pdf')).not.toBeNull();
        expect(screen.getByText('2 MB')).not.toBeNull();
    });

    it('replaces the previous one while the zone takes a single file', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([droppedFile('first.pdf', 'application/pdf')]);
        await screen.findByText('first.pdf');

        drop([droppedFile('second.pdf', 'application/pdf')]);
        await screen.findByText('second.pdf');

        expect(screen.queryByText('first.pdf')).toBeNull();
    });

    it('joins the previous ones once the zone takes many', async () => {
        render(<Dropzone multiple data-testid="zone" />);

        drop([droppedFile('first.pdf', 'application/pdf')]);
        await screen.findByText('first.pdf');

        drop([droppedFile('second.pdf', 'application/pdf')]);
        await screen.findByText('second.pdf');

        expect(screen.queryByText('first.pdf')).not.toBeNull();
    });
});

describe('a file the zone does not accept', () => {
    const accept = { 'application/pdf': ['.pdf'] };

    it('surfaces the error state', async () => {
        render(<Dropzone accept={accept} data-testid="zone" />);

        drop([droppedFile('notes.txt', 'text/plain')]);

        expect(
            await screen.findByText('That file type is not accepted.'),
        ).not.toBeNull();
        expect(area().getAttribute('aria-invalid')).toBe('true');
    });

    it('never reaches the handler', async () => {
        const onFilesChange = vi.fn();
        const onRejected = vi.fn();

        render(
            <Dropzone
                accept={accept}
                onFilesChange={onFilesChange}
                onRejected={onRejected}
                data-testid="zone"
            />,
        );

        drop([droppedFile('notes.txt', 'text/plain')]);

        await waitFor(() => expect(onRejected).toHaveBeenCalledTimes(1));
        expect(onFilesChange).not.toHaveBeenCalled();
    });

    it('accepts the type it was configured for, so the rejection above is not vacuous', async () => {
        const onFilesChange = vi.fn();

        render(
            <Dropzone
                accept={accept}
                onFilesChange={onFilesChange}
                data-testid="zone"
            />,
        );

        drop([droppedFile('invoice.pdf', 'application/pdf')]);

        await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
        expect(
            screen.queryByText('That file type is not accepted.'),
        ).toBeNull();
    });

    it('names the cap it broke when the file is too large', async () => {
        render(<Dropzone maxSize={5 * 1024 * 1024} data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf', 6 * 1024 * 1024)]);

        expect(
            await screen.findByText('That file is larger than 5 MB.'),
        ).not.toBeNull();
    });

    it('clears the error once an accepted file arrives', async () => {
        render(<Dropzone accept={accept} data-testid="zone" />);

        drop([droppedFile('notes.txt', 'text/plain')]);
        await screen.findByText('That file type is not accepted.');

        drop([droppedFile('invoice.pdf', 'application/pdf')]);

        await waitFor(() =>
            expect(
                screen.queryByText('That file type is not accepted.'),
            ).toBeNull(),
        );
    });
});

describe('a disabled zone', () => {
    it('takes nothing that is dropped on it, while the enabled zone beside it takes the same file', async () => {
        const blocked = vi.fn();
        const allowed = vi.fn();

        render(
            <>
                <Dropzone
                    disabled
                    onFilesChange={blocked}
                    data-testid="disabled-zone"
                />
                <Dropzone onFilesChange={allowed} data-testid="zone" />
            </>,
        );

        drop([droppedFile('invoice.pdf', 'application/pdf')], 'disabled-zone');
        drop([droppedFile('invoice.pdf', 'application/pdf')]);

        await waitFor(() => expect(allowed).toHaveBeenCalledTimes(1));
        expect(blocked).not.toHaveBeenCalled();
        expect(
            screen
                .getByTestId('disabled-zone')
                .querySelector('[data-slot="dropzone-file"]'),
        ).toBeNull();
    });

    it('reports itself disabled rather than only looking it', () => {
        render(<Dropzone disabled data-testid="zone" />);

        expect(area().getAttribute('aria-disabled')).toBe('true');
        expect(area().dataset.disabled).toBe('true');
    });

    it('takes no highlight from a drag either', async () => {
        render(<Dropzone disabled data-testid="zone" />);

        fireEvent.dragEnter(
            area(),
            dragging([droppedFile('a.pdf', 'application/pdf')]),
        );

        await Promise.resolve();
        expect(area().dataset.dragActive).toBeUndefined();
    });
});

describe('a chosen file', () => {
    it('can be removed again', async () => {
        const onFilesChange = vi.fn();

        render(<Dropzone data-testid="zone" onFilesChange={onFilesChange} />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        fireEvent.click(screen.getByLabelText('Remove file'));

        expect(screen.queryByText('invoice.pdf')).toBeNull();
        expect(onFilesChange).toHaveBeenLastCalledWith([]);
    });
});

describe('the zone once a single file is chosen', () => {
    it('stops inviting a file it would not take without a removal first', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        expect(screen.queryByText('Drag a file here')).toBeNull();
        expect(screen.queryByText('Choose a file')).toBeNull();
    });

    it('keeps inviting while the zone takes many, where another file still fits', async () => {
        render(<Dropzone multiple data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        expect(screen.queryByText('Drag a file here')).not.toBeNull();
        expect(screen.queryByText('Choose a file')).not.toBeNull();
    });

    it('keeps the file input mounted, so choosing one after a removal still works', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        expect(
            area().querySelector('[data-slot="dropzone-input"]'),
        ).not.toBeNull();
    });

    it('invites again once the file is removed', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        fireEvent.click(screen.getByLabelText('Remove file'));

        expect(screen.queryByText('Drag a file here')).not.toBeNull();
    });

    it('still reports the progress and the error it is handed', async () => {
        render(
            <Dropzone
                progress={40}
                error="The invoice is required."
                data-testid="zone"
            />,
        );

        drop([droppedFile('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        expect(
            screen
                .getByTestId('zone')
                .querySelector('[data-slot="dropzone-progress"]'),
        ).not.toBeNull();
        expect(screen.getByText('The invoice is required.')).not.toBeNull();
    });
});

describe('the labels', () => {
    it('come from the component defaults', () => {
        render(<Dropzone data-testid="zone" />);

        expect(screen.getByText('Drag a file here')).not.toBeNull();
        expect(screen.getByText('Choose a file')).not.toBeNull();
    });

    it('give way to an override, so a locale can replace every string', () => {
        render(<Dropzone idleLabel="Arraste um ficheiro" data-testid="zone" />);

        expect(screen.getByText('Arraste um ficheiro')).not.toBeNull();
        expect(screen.queryByText('Drag a file here')).toBeNull();
    });
});

describe('an upload in flight', () => {
    it('renders the progress it is handed', () => {
        render(<Dropzone progress={40} data-testid="zone" />);

        const bar = screen
            .getByTestId('zone')
            .querySelector('[data-slot="dropzone-progress"]');

        expect(bar?.getAttribute('aria-valuenow')).toBe('40');
        expect(bar?.getAttribute('aria-label')).toBe('Uploading, 40% done');
    });

    it('renders none when it is handed none', () => {
        render(<Dropzone data-testid="zone" />);

        expect(
            screen
                .getByTestId('zone')
                .querySelector('[data-slot="dropzone-progress"]'),
        ).toBeNull();
    });
});

describe('an error handed in by the form', () => {
    it('outranks the zone silence', () => {
        render(
            <Dropzone error="The invoice is required." data-testid="zone" />,
        );

        expect(screen.getByText('The invoice is required.')).not.toBeNull();
        expect(area().getAttribute('aria-invalid')).toBe('true');
    });

    it('points the zone at the message a reader would hear', () => {
        render(
            <Dropzone error="The invoice is required." data-testid="zone" />,
        );

        const described = area().getAttribute('aria-describedby');

        expect(described).not.toBeNull();
        expect(document.getElementById(described!)?.textContent).toBe(
            'The invoice is required.',
        );
    });

    it('describes nothing while there is no message', () => {
        render(<Dropzone data-testid="zone" />);

        expect(area().getAttribute('aria-describedby')).toBeNull();
    });
});
