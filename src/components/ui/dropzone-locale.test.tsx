// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Dropzone } from '@/components/ui/dropzone';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

import { dragging, droppedFile } from '../../../tests/fixtures/dropzone';

afterEach(cleanup);

function drop(files: File[]): void {
    fireEvent.drop(
        screen
            .getByTestId('zone')
            .querySelector<HTMLElement>('[data-slot="dropzone-area"]')!,
        dragging(files),
    );
}

function inPortuguese(zone: React.ReactNode) {
    return render(
        <UiLocaleProvider labels={ptLabels}>{zone}</UiLocaleProvider>,
    );
}

const pdf = (name = 'fatura.pdf', size = 1024) =>
    droppedFile(name, 'application/pdf', size);

describe('a rejected file under the Portuguese locale', () => {
    it('names a refused type in Portuguese', async () => {
        inPortuguese(
            <Dropzone data-testid="zone" accept={{ 'image/png': ['.png'] }} />,
        );

        drop([pdf()]);

        expect(
            await screen.findByText('Este tipo de ficheiro não é aceite.'),
        ).toBeDefined();
    });

    it('names the size cap in Portuguese', async () => {
        inPortuguese(<Dropzone data-testid="zone" maxSize={1024} />);

        drop([pdf('grande.pdf', 4096)]);

        expect(
            await screen.findByText('O ficheiro é maior do que 1 KB.'),
        ).toBeDefined();
    });

    it('names the file cap in Portuguese', async () => {
        inPortuguese(<Dropzone data-testid="zone" multiple maxFiles={1} />);

        drop([pdf('a.pdf'), pdf('b.pdf')]);

        expect(
            await screen.findByText('Anexe no máximo 1 ficheiros.'),
        ).toBeDefined();
    });

    it('falls back to the generic Portuguese message without a cap to name', async () => {
        inPortuguese(<Dropzone data-testid="zone" />);

        drop([pdf('a.pdf'), pdf('b.pdf')]);

        expect(
            await screen.findByText('O ficheiro não foi aceite.'),
        ).toBeDefined();
    });

    it('names the removal of an accepted file in Portuguese', async () => {
        inPortuguese(<Dropzone data-testid="zone" />);

        drop([pdf()]);

        expect(
            await screen.findByRole('button', { name: 'Remover ficheiro' }),
        ).toBeDefined();
    });
});
