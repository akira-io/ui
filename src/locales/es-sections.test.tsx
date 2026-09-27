// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { DangerZone } from '@/blocks/danger-zone';
import { FormDialog } from '@/blocks/form-dialog';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { RichTextEditor } from '@/components/ui/editor/rich-text-editor';
import { EmptyState } from '@/components/ui/empty-state';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UiLocaleProvider } from '@/locales/context';
import { esLabels } from '@/locales/es';
import { installMatchMedia } from '../../tests/fixtures/match-media';
import { supportProseMirrorLayout } from '../../tests/helpers/prosemirror';

class ObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
        return [];
    }
}

supportProseMirrorLayout();

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ObserverStub as unknown as typeof ResizeObserver;
    globalThis.IntersectionObserver ??=
        ObserverStub as unknown as typeof IntersectionObserver;
    installMatchMedia();
});

afterEach(cleanup);

function noop(): void {}

function inSpanish(children: React.ReactNode) {
    return render(
        <UiLocaleProvider labels={esLabels}>{children}</UiLocaleProvider>,
    );
}

describe('the primitives under the Spanish bundle', () => {
    it('closes the dialog in Spanish', () => {
        inSpanish(
            <Dialog open>
                <DialogContent aria-describedby={undefined}>
                    <DialogTitle>Título</DialogTitle>
                </DialogContent>
            </Dialog>,
        );

        expect(screen.getByRole('button', { name: 'Cerrar' })).toBeDefined();
    });

    it('names the pagination in Spanish', () => {
        inSpanish(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>,
        );

        expect(
            screen.getByRole('navigation', { name: 'Paginación' }),
        ).toBeDefined();
        expect(
            screen.getByRole('link', { name: 'Ir a la página siguiente' }),
        ).toBeDefined();
        expect(screen.getByText('Más páginas')).toBeDefined();
    });

    it('names the sidebar toggle in Spanish', () => {
        inSpanish(
            <SidebarProvider>
                <SidebarTrigger />
            </SidebarProvider>,
        );

        expect(
            screen.getByRole('button', {
                name: 'Mostrar u ocultar la barra lateral',
            }),
        ).toBeDefined();
    });

    it('describes the carousel in Spanish', () => {
        inSpanish(
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Uno</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>,
        );

        expect(
            screen.getByRole('region').getAttribute('aria-roledescription'),
        ).toBe('carrusel');
        expect(
            screen.getByRole('button', { name: 'Diapositiva anterior' }),
        ).toBeDefined();
    });
});

describe('the blocks and editor under the Spanish bundle', () => {
    it('reads the editor toolbar in Spanish', async () => {
        inSpanish(<RichTextEditor value="<p>Texto</p>" onChange={noop} />);

        expect(
            await screen.findByRole('toolbar', { name: 'Formato' }),
        ).toBeDefined();
        expect(screen.getByRole('button', { name: 'Negrita' })).toBeDefined();
    });

    it('titles the empty state in Spanish', () => {
        inSpanish(<EmptyState />);

        expect(screen.getByText('No hay nada que mostrar')).toBeDefined();
    });

    it('words the danger zone in Spanish', () => {
        inSpanish(
            <DangerZone
                actions={[{ id: 'delete', title: 'Eliminar', onConfirm: noop }]}
            />,
        );

        expect(screen.getByText('Zona de peligro')).toBeDefined();
    });

    it('words the form dialog actions in Spanish', () => {
        inSpanish(
            <FormDialog open onOpenChange={noop} title="Editar" onSave={noop}>
                <p>Cuerpo</p>
            </FormDialog>,
        );

        expect(screen.getByRole('button', { name: 'Guardar' })).toBeDefined();
    });
});
