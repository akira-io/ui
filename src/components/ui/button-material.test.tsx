/** @vitest-environment jsdom */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

const classes = (element: React.ReactElement) =>
    render(element).container.querySelector('button')!.className.split(' ');

describe('Button material', () => {
    it('is prominent glass by default', () => {
        expect(classes(<Button>Save</Button>)).toEqual(
            expect.arrayContaining([
                'glass-prominent',
                'glass-edge',
                'rounded-full',
                'h-control',
                'text-control',
            ]),
        );
    });

    it.each(['secondary', 'outline', 'destructive'] as const)(
        'is plain glass for %s',
        (variant) => {
            expect(classes(<Button variant={variant}>x</Button>)).toEqual(
                expect.arrayContaining(['glass-button', 'glass-edge']),
            );
        },
    );

    it('writes destructive in red over the glass', () => {
        expect(classes(<Button variant="destructive">x</Button>)).toContain(
            'text-destructive',
        );
    });

    it('grows when pressed as glass', () => {
        expect(classes(<Button>x</Button>)).toContain('active:scale-[1.06]');
    });

    it('darkens when pressed as solid', () => {
        const solid = classes(<Button material="solid">x</Button>);

        expect(solid).toContain('bg-primary');
        expect(solid).toContain('active:brightness-[0.88]');
        expect(solid).not.toContain('active:scale-[1.06]');
    });

    it('drops the wide shadow and the hover zoom', () => {
        expect(classes(<Button>x</Button>).join(' ')).not.toMatch(
            /shadow-xl|hover:scale/,
        );
    });

    it('leaves the pointer cursor to links', () => {
        expect(classes(<Button>x</Button>)).not.toContain('cursor-pointer');
        expect(classes(<Button variant="link">x</Button>)).toContain(
            'cursor-pointer',
        );
    });

    it('writes a regular weight', () => {
        expect(classes(<Button>x</Button>)).toContain('font-normal');
    });
});
