import { describe, expect, it } from 'vitest';

import * as pt from '@/locales/pt';
import { ptLabels } from '@/locales/pt';

const PRE_AGREEMENT_INFIXES = ['(?<!f)acç', 'ecç', 'activ', 'electr', 'eléctr'];

const PRE_AGREEMENT_STEMS = [
    'acto',
    'actor',
    'actua',
    'adjectiv',
    'adopt',
    'arquitect',
    'assumpç',
    'baptis',
    'colecç',
    'colectiv',
    'correcç',
    'correct',
    'detect',
    'direcç',
    'direct',
    'efectiv',
    'efectu',
    'exact',
    'excepç',
    'excepto',
    'factor',
    'injecç',
    'inspecç',
    'objectiv',
    'óptim',
    'óptic',
    'percepç',
    'projecç',
    'project',
    'protecç',
    'protect',
    'reacç',
    'recepç',
    'respectiv',
    'secç',
    'sector',
    'selecç',
    'seleccion',
    'selectiv',
    'tecto',
];

const PRE_AGREEMENT_FORM = new RegExp(
    `${PRE_AGREEMENT_INFIXES.join('|')}|(?<!\\p{L})(?:${PRE_AGREEMENT_STEMS.join('|')})`,
    'iu',
);

function collectStrings(value: unknown, path: string): [string, string][] {
    if (typeof value === 'string') {
        return [[path, value]];
    }
    if (typeof value === 'function') {
        return collectStrings(value(3, 'Safari', 'macOS'), `${path}()`);
    }
    if (value && typeof value === 'object') {
        return Object.entries(value).flatMap(([key, nested]) =>
            collectStrings(nested, path ? `${path}.${key}` : key),
        );
    }
    return [];
}

describe('the portuguese labels', () => {
    const strings = [
        ...collectStrings(ptLabels, 'ptLabels'),
        ...collectStrings(pt, 'pt'),
    ];

    it('walks every label', () => {
        expect(strings.length).toBeGreaterThan(100);
    });

    it('follow the orthographic agreement in force in Portugal', () => {
        const offenders = strings.filter(([, text]) =>
            PRE_AGREEMENT_FORM.test(text),
        );

        expect(offenders).toEqual([]);
    });

    it.each([
        'facto',
        'contacto',
        'pacto',
        'compacto',
        'facção',
        'perspectiva',
        'opcional',
        'receção',
        'ação',
        'atual',
        'Selecione',
        'opção',
        'opções',
        'fatores',
    ])('accepts the current form "%s"', (word) => {
        expect(PRE_AGREEMENT_FORM.test(word)).toBe(false);
    });
});
