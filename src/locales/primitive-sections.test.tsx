// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbList,
} from '@/components/ui/breadcrumb';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import {
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { UiLocaleProvider, type UiLabels } from '@/locales/context';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';
import { installMatchMedia } from '../../tests/fixtures/match-media';

class ObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
        return [];
    }
}

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ObserverStub as unknown as typeof ResizeObserver;
    globalThis.IntersectionObserver ??=
        ObserverStub as unknown as typeof IntersectionObserver;
    installMatchMedia();
});

afterEach(cleanup);

function under(labels: UiLabels, children: React.ReactNode) {
    return render(
        <UiLocaleProvider labels={labels}>{children}</UiLocaleProvider>,
    );
}

function PaginationHarness() {
    return (
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
        </Pagination>
    );
}

function CarouselHarness() {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>Um</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

describe('the overlay close buttons under the locale provider', () => {
    it('names the dialog close button from the provider', () => {
        under(
            ptLabels,
            <Dialog open>
                <DialogContent aria-describedby={undefined}>
                    <DialogTitle>Título</DialogTitle>
                </DialogContent>
            </Dialog>,
        );

        expect(screen.getByRole('button', { name: 'Fechar' })).toBeDefined();
    });

    it('lets the dialog closeLabel prop outrank the locale', () => {
        under(
            ptLabels,
            <Dialog open>
                <DialogContent aria-describedby={undefined} closeLabel="Sair">
                    <DialogTitle>Título</DialogTitle>
                </DialogContent>
            </Dialog>,
        );

        expect(screen.getByRole('button', { name: 'Sair' })).toBeDefined();
    });

    it('names the sheet close button from the provider', () => {
        under(
            frLabels,
            <Sheet open>
                <SheetContent aria-describedby={undefined}>
                    <SheetTitle>Titre</SheetTitle>
                </SheetContent>
            </Sheet>,
        );

        expect(screen.getByRole('button', { name: 'Fermer' })).toBeDefined();
    });

    it('lets the sheet closeLabel prop outrank the locale', () => {
        under(
            ptLabels,
            <Sheet open>
                <SheetContent aria-describedby={undefined} closeLabel="Sair">
                    <SheetTitle>Título</SheetTitle>
                </SheetContent>
            </Sheet>,
        );

        expect(screen.getByRole('button', { name: 'Sair' })).toBeDefined();
    });
});

describe('the pagination under the locale provider', () => {
    it('names the navigation and both page links in Portuguese', () => {
        under(ptLabels, <PaginationHarness />);

        expect(
            screen.getByRole('navigation', { name: 'Paginação' }),
        ).toBeDefined();
        expect(
            screen.getByRole('link', { name: 'Ir para a página anterior' }),
        ).toBeDefined();
        expect(
            screen.getByRole('link', { name: 'Ir para a página seguinte' }),
        ).toBeDefined();
    });

    it('shows the visible previous and next words in Portuguese', () => {
        under(ptLabels, <PaginationHarness />);

        expect(screen.getByText('Anterior')).toBeDefined();
        expect(screen.getByText('Seguinte')).toBeDefined();
        expect(screen.getByText('Mais páginas')).toBeDefined();
    });

    it('lets a label prop outrank the locale', () => {
        under(
            ptLabels,
            <Pagination>
                <PaginationPrevious href="#" label="Recuar" />
            </Pagination>,
        );

        expect(screen.getByText('Recuar')).toBeDefined();
    });
});

describe('the breadcrumb under the locale provider', () => {
    it('names the navigation and the ellipsis in French', () => {
        under(
            frLabels,
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbEllipsis />
                </BreadcrumbList>
            </Breadcrumb>,
        );

        expect(
            screen.getByRole('navigation', { name: "Fil d'Ariane" }),
        ).toBeDefined();
        expect(screen.getByText('Plus')).toBeDefined();
    });

    it('lets an aria-label outrank the locale', () => {
        under(ptLabels, <Breadcrumb aria-label="Caminho" />);

        expect(
            screen.getByRole('navigation', { name: 'Caminho' }),
        ).toBeDefined();
    });
});

describe('the sidebar under the locale provider', () => {
    it('names the trigger and the rail in Portuguese', () => {
        under(
            ptLabels,
            <SidebarProvider>
                <SidebarTrigger />
                <SidebarRail />
            </SidebarProvider>,
        );

        expect(
            screen.getAllByRole('button', {
                name: 'Mostrar ou ocultar a barra lateral',
            }),
        ).toHaveLength(2);
    });

    it('lets a label prop outrank the locale on the trigger', () => {
        under(
            ptLabels,
            <SidebarProvider>
                <SidebarTrigger label="Menu" />
            </SidebarProvider>,
        );

        expect(screen.getByRole('button', { name: 'Menu' })).toBeDefined();
    });
});

describe('the carousel under the locale provider', () => {
    it('describes the region and its slides in Portuguese', () => {
        under(ptLabels, <CarouselHarness />);

        expect(
            screen.getByRole('region').getAttribute('aria-roledescription'),
        ).toBe('carrossel');
        expect(
            screen.getByRole('group').getAttribute('aria-roledescription'),
        ).toBe('diapositivo');
    });

    it('names the previous and next buttons in Portuguese', () => {
        under(ptLabels, <CarouselHarness />);

        expect(
            screen.getByRole('button', { name: 'Diapositivo anterior' }),
        ).toBeDefined();
        expect(
            screen.getByRole('button', { name: 'Diapositivo seguinte' }),
        ).toBeDefined();
    });

    it('lets a label prop outrank the locale', () => {
        under(
            ptLabels,
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Um</CarouselItem>
                </CarouselContent>
                <CarouselNext label="Avançar" />
            </Carousel>,
        );

        expect(screen.getByRole('button', { name: 'Avançar' })).toBeDefined();
    });
});

describe('the primitives without a provider', () => {
    it('keep their English defaults', () => {
        render(<PaginationHarness />);

        expect(
            screen.getByRole('navigation', { name: 'pagination' }),
        ).toBeDefined();
        expect(
            screen.getByRole('link', { name: 'Go to previous page' }),
        ).toBeDefined();
        expect(screen.getByText('More pages')).toBeDefined();
    });
});

function namesIn(container: HTMLElement): string {
    const labelled = [...container.querySelectorAll('[aria-label]')].map(
        (element) => element.getAttribute('aria-label'),
    );

    return [container.textContent, ...labelled].join(' ');
}

describe('every label prop a primitive part takes', () => {
    it.each([
        [
            'PaginationNext',
            <Pagination key="p">
                <PaginationNext href="#" label="Avançar" />
            </Pagination>,
        ],
        [
            'PaginationEllipsis',
            <Pagination key="p">
                <PaginationEllipsis label="Avançar" />
            </Pagination>,
        ],
        ['BreadcrumbEllipsis', <BreadcrumbEllipsis key="b" label="Avançar" />],
        [
            'SidebarRail',
            <SidebarProvider key="s">
                <SidebarRail label="Avançar" />
            </SidebarProvider>,
        ],
        [
            'CarouselPrevious',
            <Carousel key="c">
                <CarouselContent>
                    <CarouselItem>Um</CarouselItem>
                </CarouselContent>
                <CarouselPrevious label="Avançar" />
            </Carousel>,
        ],
    ])('outranks the locale on %s', (_part, element) => {
        const { container } = under(ptLabels, element);

        expect(namesIn(container)).toContain('Avançar');
    });
});

describe('the primitives under the French bundle', () => {
    it('closes the dialog in French', () => {
        under(
            frLabels,
            <Dialog open>
                <DialogContent aria-describedby={undefined}>
                    <DialogTitle>Titre</DialogTitle>
                </DialogContent>
            </Dialog>,
        );

        expect(screen.getByRole('button', { name: 'Fermer' })).toBeDefined();
    });

    it('names the pagination in French', () => {
        under(frLabels, <PaginationHarness />);

        expect(
            screen.getByRole('navigation', { name: 'Pagination' }),
        ).toBeDefined();
        expect(
            screen.getByRole('link', { name: 'Aller à la page suivante' }),
        ).toBeDefined();
        expect(screen.getByText('Plus de pages')).toBeDefined();
    });

    it('names the sidebar toggle in French', () => {
        under(
            frLabels,
            <SidebarProvider>
                <SidebarTrigger />
            </SidebarProvider>,
        );

        expect(
            screen.getByRole('button', {
                name: 'Afficher ou masquer la barre latérale',
            }),
        ).toBeDefined();
    });

    it('describes the carousel in French', () => {
        under(frLabels, <CarouselHarness />);

        expect(
            screen.getByRole('region').getAttribute('aria-roledescription'),
        ).toBe('carrousel');
        expect(
            screen.getByRole('button', { name: 'Diapositive précédente' }),
        ).toBeDefined();
    });
});

describe('the breadcrumb ellipsis under the Portuguese bundle', () => {
    it('reads its hidden text from the provider', () => {
        under(ptLabels, <BreadcrumbEllipsis />);

        expect(screen.getByText('Mais')).toBeDefined();
    });
});
