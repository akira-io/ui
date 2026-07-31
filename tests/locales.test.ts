import { dataTableLabelsPt, dateRangeFilterLabelsPt } from '@/locales/pt';
import { describe, expect, it } from 'vitest';

describe('the portuguese data table labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableLabelsPt).sort()).toEqual([
            'clearFiltersLabel',
            'createLabel',
            'emptyLabel',
            'paginationLabel',
            'searchPlaceholder',
        ]);
    });

    it('builds the pagination label with both numbers', () => {
        expect(dataTableLabelsPt.paginationLabel(2, 7)).toBe('Página 2 de 7');
    });
});

describe('the portuguese date range filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateRangeFilterLabelsPt).sort()).toEqual([
            'dateFormat',
            'emptyLabel',
        ]);
    });

    it('keeps the day before the month, as Portuguese readers expect', () => {
        expect(dateRangeFilterLabelsPt.dateFormat).toBe('dd/MM/yy');
    });
});
