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

afterEach(cleanup);

function file(name: string, type: string, size = 1024): File {
    const created = new File(['x'], name, { type });

    Object.defineProperty(created, 'size', { value: size });

    return created;
}

function transfer(files: File[]) {
    return {
        dataTransfer: {
            files,
            items: files.map((entry) => ({
                kind: 'file',
                type: entry.type,
                getAsFile: () => entry,
            })),
            types: ['Files'],
        },
    };
}

function area(testId = 'zone'): HTMLElement {
    return screen
        .getByTestId(testId)
        .querySelector<HTMLElement>('[data-slot="dropzone-area"]')!;
}

function drop(files: File[], testId = 'zone'): void {
    fireEvent.drop(area(testId), transfer(files));
}

describe('a dropped file', () => {
    it('reaches the handler', async () => {
        const onFilesChange = vi.fn();

        render(<Dropzone data-testid="zone" onFilesChange={onFilesChange} />);

        drop([file('invoice.pdf', 'application/pdf')]);

        await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
        expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(
            ['invoice.pdf'],
        );
    });

    it('is named and measured in the zone', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([file('invoice.pdf', 'application/pdf', 2 * 1024 * 1024)]);

        expect(await screen.findByText('invoice.pdf')).not.toBeNull();
        expect(screen.getByText('2 MB')).not.toBeNull();
    });

    it('replaces the previous one while the zone takes a single file', async () => {
        render(<Dropzone data-testid="zone" />);

        drop([file('first.pdf', 'application/pdf')]);
        await screen.findByText('first.pdf');

        drop([file('second.pdf', 'application/pdf')]);
        await screen.findByText('second.pdf');

        expect(screen.queryByText('first.pdf')).toBeNull();
    });

    it('joins the previous ones once the zone takes many', async () => {
        render(<Dropzone multiple data-testid="zone" />);

        drop([file('first.pdf', 'application/pdf')]);
        await screen.findByText('first.pdf');

        drop([file('second.pdf', 'application/pdf')]);
        await screen.findByText('second.pdf');

        expect(screen.queryByText('first.pdf')).not.toBeNull();
    });
});

describe('a file the zone does not accept', () => {
    const accept = { 'application/pdf': ['.pdf'] };

    it('surfaces the error state', async () => {
        render(<Dropzone accept={accept} data-testid="zone" />);

        drop([file('notes.txt', 'text/plain')]);

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

        drop([file('notes.txt', 'text/plain')]);

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

        drop([file('invoice.pdf', 'application/pdf')]);

        await waitFor(() => expect(onFilesChange).toHaveBeenCalledTimes(1));
        expect(
            screen.queryByText('That file type is not accepted.'),
        ).toBeNull();
    });

    it('names the cap it broke when the file is too large', async () => {
        render(<Dropzone maxSize={5 * 1024 * 1024} data-testid="zone" />);

        drop([file('invoice.pdf', 'application/pdf', 6 * 1024 * 1024)]);

        expect(
            await screen.findByText('That file is larger than 5 MB.'),
        ).not.toBeNull();
    });

    it('clears the error once an accepted file arrives', async () => {
        render(<Dropzone accept={accept} data-testid="zone" />);

        drop([file('notes.txt', 'text/plain')]);
        await screen.findByText('That file type is not accepted.');

        drop([file('invoice.pdf', 'application/pdf')]);

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

        drop([file('invoice.pdf', 'application/pdf')], 'disabled-zone');
        drop([file('invoice.pdf', 'application/pdf')]);

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
            transfer([file('a.pdf', 'application/pdf')]),
        );

        await Promise.resolve();
        expect(area().dataset.dragActive).toBeUndefined();
    });
});

describe('a drag crossing the zone', () => {
    function child(): HTMLElement {
        return area().querySelector<HTMLElement>('p')!;
    }

    it('highlights the zone on entry', async () => {
        render(<Dropzone data-testid="zone" />);

        fireEvent.dragEnter(
            area(),
            transfer([file('a.pdf', 'application/pdf')]),
        );

        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));
    });

    it('keeps the highlight when the pointer crosses a child element', async () => {
        render(<Dropzone data-testid="zone" />);

        const dragged = transfer([file('a.pdf', 'application/pdf')]);

        fireEvent.dragEnter(area(), dragged);
        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));

        fireEvent.dragEnter(child(), dragged);
        fireEvent.dragLeave(child(), dragged);

        await Promise.resolve();
        expect(area().dataset.dragActive).toBe('true');
    });

    it('drops the highlight once the pointer leaves the zone, so the assertion above is not vacuous', async () => {
        render(<Dropzone data-testid="zone" />);

        const dragged = transfer([file('a.pdf', 'application/pdf')]);

        fireEvent.dragEnter(area(), dragged);
        await waitFor(() => expect(area().dataset.dragActive).toBe('true'));

        fireEvent.dragLeave(area(), dragged);

        await waitFor(() => expect(area().dataset.dragActive).toBeUndefined());
    });
});

describe('a chosen file', () => {
    it('can be removed again', async () => {
        const onFilesChange = vi.fn();

        render(<Dropzone data-testid="zone" onFilesChange={onFilesChange} />);

        drop([file('invoice.pdf', 'application/pdf')]);
        await screen.findByText('invoice.pdf');

        fireEvent.click(screen.getByLabelText('Remove file'));

        expect(screen.queryByText('invoice.pdf')).toBeNull();
        expect(onFilesChange).toHaveBeenLastCalledWith([]);
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
