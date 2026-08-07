// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { AppearanceToggle } from '@/components/ui/appearance-toggle';
import { CodeBlock } from '@/components/ui/code-block';
import { CopyButton } from '@/components/ui/copy-button';
import { DatePicker } from '@/components/ui/date-picker';
import { JsonViewer } from '@/components/ui/json-viewer';
import { SaveStatus } from '@/components/ui/save-status';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';
import {
    ComboboxHarness,
    ConfirmHarness,
    DataTableHarness,
    DateFilterHarness,
} from '../../tests/fixtures/locale';
import { installMatchMedia } from '../../tests/fixtures/match-media';

beforeEach(() => installMatchMedia());

afterEach(cleanup);

function inPortuguese(children: React.ReactNode) {
    return render(
        <UiLocaleProvider labels={ptLabels}>{children}</UiLocaleProvider>,
    );
}

describe('a component under the locale provider', () => {
    it('reads the combobox placeholder from the provider', () => {
        inPortuguese(<ComboboxHarness />);

        expect(screen.getByText('Seleccione uma opção')).toBeDefined();
    });

    it('reads the date filter all-time label from the provider', () => {
        inPortuguese(<DateFilterHarness value={{ mode: 'all' }} />);

        expect(screen.getByText('Todo o período')).toBeDefined();
    });

    it('reads the date filter presets from the provider', () => {
        inPortuguese(
            <DateFilterHarness
                value={{ mode: 'preset', preset: 'previous_month' }}
            />,
        );

        expect(screen.getByText('Mês anterior')).toBeDefined();
    });

    it('reads the data table labels from the provider', () => {
        inPortuguese(<DataTableHarness />);

        expect(screen.getByPlaceholderText('Pesquisar...')).toBeDefined();
        expect(screen.getByText('Sem registos.')).toBeDefined();
    });

    it('reads the appearance options from the provider', () => {
        inPortuguese(<AppearanceToggle />);

        expect(screen.getByLabelText('Claro')).toBeDefined();
        expect(screen.getByLabelText('Sistema')).toBeDefined();
    });

    it('reads the date picker placeholder from the provider', () => {
        inPortuguese(<DatePicker />);

        expect(screen.getByText('Escolha uma data')).toBeDefined();
    });

    it('reads the save status message from the provider', () => {
        inPortuguese(<SaveStatus status="saving" />);

        expect(screen.getByText('A guardar')).toBeDefined();
    });

    it('reads the copy button label from the provider', () => {
        inPortuguese(<CopyButton value="token" />);

        expect(screen.getByRole('button', { name: 'Copiar' })).toBeDefined();
    });

    it('reads the code block copy label from the provider', () => {
        render(
            <UiLocaleProvider
                labels={{ codeBlock: { copyLabel: 'Copiar código' } }}
            >
                <CodeBlock code="const a = 1;" />
            </UiLocaleProvider>,
        );

        expect(
            screen.getByRole('button', { name: 'Copiar código' }),
        ).toBeDefined();
    });

    it('reads the json viewer entry count from the provider', () => {
        inPortuguese(<JsonViewer value={{ nested: { a: 1, b: 2 } }} />);

        expect(screen.getByText('2 entradas')).toBeDefined();
    });
});

describe('a component given both a prop and a provider', () => {
    it('keeps the prop, so one screen can differ', () => {
        inPortuguese(<ComboboxHarness placeholder="Escolha o país" />);

        expect(screen.getByText('Escolha o país')).toBeDefined();
    });
});

describe('a component with no provider around it', () => {
    it('keeps the english combobox placeholder', () => {
        render(<ComboboxHarness />);

        expect(screen.getByText('Select an option')).toBeDefined();
    });

    it('keeps the english data table labels', () => {
        render(<DataTableHarness />);

        expect(screen.getByPlaceholderText('Search...')).toBeDefined();
        expect(screen.getByText('No results.')).toBeDefined();
    });

    it('keeps the english date filter all-time label', () => {
        render(<DateFilterHarness value={{ mode: 'all' }} />);

        expect(screen.getByText('All time')).toBeDefined();
    });

    it('keeps the english appearance options', () => {
        render(<AppearanceToggle />);

        expect(screen.getByLabelText('Light')).toBeDefined();
        expect(screen.getByLabelText('System')).toBeDefined();
    });

    it('keeps the english date picker placeholder', () => {
        render(<DatePicker />);

        expect(screen.getByText('Pick a date')).toBeDefined();
    });

    it('keeps the english save status message', () => {
        render(<SaveStatus status="saving" />);

        expect(screen.getByText('Saving')).toBeDefined();
    });

    it('keeps the english copy button label', () => {
        render(<CopyButton value="token" />);

        expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    it('keeps the english json viewer entry count', () => {
        render(<JsonViewer value={{ nested: { a: 1, b: 2 } }} />);

        expect(screen.getByText('2 entries')).toBeDefined();
    });
});

describe('the confirm dialog hook', () => {
    it('takes its defaults from the provider', async () => {
        const user = userEvent.setup();

        inPortuguese(<ConfirmHarness />);
        await user.click(screen.getByRole('button', { name: 'Ask' }));

        expect(screen.getByText('Confirmar Ação')).toBeDefined();
        expect(screen.getByRole('button', { name: /Cancelar/ })).toBeDefined();
    });

    it('keeps the english defaults with no provider', async () => {
        const user = userEvent.setup();

        render(<ConfirmHarness />);
        await user.click(screen.getByRole('button', { name: 'Ask' }));

        expect(screen.getByText('Confirm Action')).toBeDefined();
        expect(screen.getByRole('button', { name: /Cancel/ })).toBeDefined();
    });
});
