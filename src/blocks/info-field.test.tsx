// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hash } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { InfoField } from '@/blocks/info-field';
import {
    stubClipboard,
    type ClipboardStub,
} from '../../tests/fixtures/clipboard';

let clipboard: ClipboardStub | undefined;

afterEach(() => {
    cleanup();
    clipboard?.restore();
    clipboard = undefined;
});

describe('a copyable info field', () => {
    it('writes the value it displays to the clipboard', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(
            <InfoField icon={Hash} label="Documento" value="26894" copyable />,
        );
        await user.click(screen.getByRole('button', { name: 'Copy' }));

        await waitFor(() => expect(clipboard?.writes).toEqual(['26894']));
    });

    it('copies the text the caller gives when the value is not plain text', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(
            <InfoField
                icon={Hash}
                label="Documento"
                value={<strong>26 894</strong>}
                copyValue="26894"
                copyable
            />,
        );
        await user.click(screen.getByRole('button', { name: 'Copy' }));

        await waitFor(() => expect(clipboard?.writes).toEqual(['26894']));
    });

    it.each([
        ['an empty string', ''],
        ['blank text', '   '],
        ['nothing at all', null],
    ])('renders no control for %s', (_case, value) => {
        render(
            <InfoField icon={Hash} label="Documento" value={value} copyable />,
        );

        expect(screen.queryByRole('button')).toBeNull();
    });

    it('renders no control for markup without copyable text', () => {
        render(
            <InfoField
                icon={Hash}
                label="Documento"
                value={<em>unavailable</em>}
                copyable
            />,
        );

        expect(screen.queryByRole('button')).toBeNull();
    });

    it('renders no control until the field is marked copyable', () => {
        render(<InfoField icon={Hash} label="Documento" value="26894" />);

        expect(screen.queryByRole('button')).toBeNull();
    });

    it('names the control in the language the page passes', () => {
        render(
            <InfoField
                icon={Hash}
                label="Documento"
                value="26894"
                copyable
                copyLabel="Copiar"
                copiedLabel="Copiado"
            />,
        );

        expect(screen.getByRole('button', { name: 'Copiar' })).toBeDefined();
    });
});
