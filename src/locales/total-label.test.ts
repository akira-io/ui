import { describe, expect, it } from 'vitest';

import { dataTableDefaultLabels } from '@/components/ui/data-table';
import { dataTableLabelsEs } from '@/locales/es';
import { dataTableLabelsFr } from '@/locales/fr';
import { dataTableLabelsPt } from '@/locales/pt';

describe('the data table total', () => {
    it.each([
        [0, '0 records'],
        [1, '1 record'],
        [2, '2 records'],
        [1204, '1,204 records'],
    ])('reads %s in English as %s', (total, expected) => {
        expect(dataTableDefaultLabels.totalLabel(total)).toBe(expected);
    });

    it.each([
        [0, '0 registos'],
        [1, '1 registo'],
        [2, '2 registos'],
    ])('reads %s in Portuguese as %s', (total, expected) => {
        expect(dataTableLabelsPt.totalLabel(total)).toBe(expected);
    });

    it.each([
        [0, '0 enregistrement'],
        [1, '1 enregistrement'],
        [2, '2 enregistrements'],
    ])('reads %s in French as %s', (total, expected) => {
        expect(dataTableLabelsFr.totalLabel(total)).toBe(expected);
    });

    it.each([
        [1, '1 registro'],
        [2, '2 registros'],
    ])('reads %s in Spanish as %s', (total, expected) => {
        expect(dataTableLabelsEs.totalLabel(total)).toBe(expected);
    });
});
