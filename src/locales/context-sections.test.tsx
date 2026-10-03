// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DangerZone } from '@/blocks/danger-zone';
import { DetailEditSheet } from '@/blocks/detail-edit-sheet';
import { FormDialog } from '@/blocks/form-dialog';
import { RichTextEditor } from '@/components/ui/editor/rich-text-editor';
import { EmptyState } from '@/components/ui/empty-state';
import { FloatingSheetStack } from '@/components/ui/floating-sheet-stack';
import { UiLocaleProvider } from '@/locales/context';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';
import { installMatchMedia } from '../../tests/fixtures/match-media';
import { supportProseMirrorLayout } from '../../tests/helpers/prosemirror';

supportProseMirrorLayout();

beforeEach(() => installMatchMedia());

afterEach(cleanup);

function inPortuguese(children: React.ReactNode) {
    return render(
        <UiLocaleProvider labels={ptLabels}>{children}</UiLocaleProvider>,
    );
}

function noop(): void {}

describe('the empty state under the locale provider', () => {
    it('reads its default title from the provider', () => {
        inPortuguese(<EmptyState />);

        expect(screen.getByText('Nada para mostrar')).toBeDefined();
    });

    it('keeps a title it is handed over the locale', () => {
        inPortuguese(<EmptyState title="Sem bilhetes" />);

        expect(screen.getByText('Sem bilhetes')).toBeDefined();
        expect(screen.queryByText('Nada para mostrar')).toBeNull();
    });
});

describe('the danger zone under the locale provider', () => {
    it('reads its heading, action and confirmation from the provider', async () => {
        inPortuguese(
            <DangerZone
                actions={[
                    { id: 'delete', title: 'Apagar conta', onConfirm: noop },
                ]}
            />,
        );

        expect(screen.getByText('Zona de perigo')).toBeDefined();

        await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }));

        expect(await screen.findByText('Confirmar Ação')).toBeDefined();
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDefined();
    });

    it('lets its labels prop outrank the locale', () => {
        inPortuguese(
            <DangerZone
                labels={{ title: 'Área restrita' }}
                actions={[
                    { id: 'delete', title: 'Apagar conta', onConfirm: noop },
                ]}
            />,
        );

        expect(screen.getByText('Área restrita')).toBeDefined();
        expect(screen.getByRole('button', { name: 'Eliminar' })).toBeDefined();
    });
});

describe('the form overlays under the locale provider', () => {
    it('reads the dialog actions from the provider', () => {
        inPortuguese(
            <FormDialog open onOpenChange={noop} title="Editar" onSave={noop}>
                <p>Corpo</p>
            </FormDialog>,
        );

        expect(screen.getByRole('button', { name: 'Guardar' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDefined();
    });

    it('reads the sheet actions from the provider', () => {
        inPortuguese(
            <FloatingSheetStack>
                <DetailEditSheet
                    open
                    onOpenChange={noop}
                    title="Editar"
                    onSave={noop}
                >
                    <p>Corpo</p>
                </DetailEditSheet>
            </FloatingSheetStack>,
        );

        expect(screen.getByRole('button', { name: 'Guardar' })).toBeDefined();
    });

    it('lets a partial labels prop outrank the locale on the sheet', () => {
        inPortuguese(
            <FloatingSheetStack>
                <DetailEditSheet
                    open
                    onOpenChange={noop}
                    title="Editar"
                    labels={{ cancelLabel: 'Descartar' }}
                    onSave={noop}
                >
                    <p>Corpo</p>
                </DetailEditSheet>
            </FloatingSheetStack>,
        );

        expect(screen.getByRole('button', { name: 'Descartar' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Guardar' })).toBeDefined();
    });

    it('lets a partial labels prop outrank the locale', () => {
        inPortuguese(
            <FormDialog
                open
                onOpenChange={noop}
                title="Editar"
                labels={{ saveLabel: 'Submeter' }}
                onSave={noop}
            >
                <p>Corpo</p>
            </FormDialog>,
        );

        expect(screen.getByRole('button', { name: 'Submeter' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDefined();
    });
});

describe('the editor under the locale provider', () => {
    it('names its toolbar and controls from the provider', async () => {
        inPortuguese(<RichTextEditor value="<p>Texto</p>" onChange={noop} />);

        expect(
            await screen.findByRole('toolbar', { name: 'Formatação' }),
        ).toBeDefined();
        expect(screen.getByRole('button', { name: 'Negrito' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Título 2' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Anular' })).toBeDefined();
    });

    it('reads French from the French bundle', async () => {
        render(
            <UiLocaleProvider labels={frLabels}>
                <RichTextEditor value="<p>Texte</p>" onChange={noop} />
            </UiLocaleProvider>,
        );

        expect(
            await screen.findByRole('toolbar', { name: 'Mise en forme' }),
        ).toBeDefined();
        expect(screen.getByRole('button', { name: 'Gras' })).toBeDefined();
    });

    it('lets a partial labels prop outrank the locale', async () => {
        inPortuguese(
            <RichTextEditor
                value="<p>Texto</p>"
                onChange={noop}
                labels={{ boldLabel: 'Carregado' }}
            />,
        );

        expect(
            await screen.findByRole('button', { name: 'Carregado' }),
        ).toBeDefined();
        expect(screen.getByRole('button', { name: 'Itálico' })).toBeDefined();
    });
});

describe('the new sections under the French bundle', () => {
    function inFrench(children: React.ReactNode) {
        return render(
            <UiLocaleProvider labels={frLabels}>{children}</UiLocaleProvider>,
        );
    }

    it('titles the empty state in French', () => {
        inFrench(<EmptyState />);

        expect(screen.getByText('Rien à afficher')).toBeDefined();
    });

    it('words the danger zone in French', () => {
        inFrench(
            <DangerZone
                actions={[
                    { id: 'delete', title: 'Supprimer', onConfirm: noop },
                ]}
            />,
        );

        expect(screen.getByText(frLabels.dangerZone.title)).toBeDefined();
    });

    it('words the form dialog actions in French', () => {
        inFrench(
            <FormDialog open onOpenChange={noop} title="Modifier" onSave={noop}>
                <p>Corps</p>
            </FormDialog>,
        );

        expect(
            screen.getByRole('button', {
                name: frLabels.formOverlay.saveLabel,
            }),
        ).toBeDefined();
    });
});
