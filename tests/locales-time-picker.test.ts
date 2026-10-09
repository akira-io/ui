import { describe, expect, it } from 'vitest';

import {
    dateTimePickerDefaultLabels,
    timePickerDefaultLabels,
} from '@/components/ui/time-picker-labels';
import { esLabels } from '@/locales/es';
import { frLabels } from '@/locales/fr';
import { ptLabels } from '@/locales/pt';

const bundles = { pt: ptLabels, es: esLabels, fr: frLabels };

describe('the time picker labels', () => {
    it.each(Object.entries(bundles))(
        '%s names every part the English defaults name',
        (_, labels) => {
            expect(Object.keys(labels.timePicker).sort()).toEqual(
                Object.keys(timePickerDefaultLabels).sort(),
            );
            expect(Object.keys(labels.dateTimePicker).sort()).toEqual(
                Object.keys(dateTimePickerDefaultLabels).sort(),
            );
        },
    );

    it('speaks European Portuguese', () => {
        expect(ptLabels.timePicker.hourLabel).toBe('Horas');
        expect(ptLabels.timePicker.clearLabel).toBe('Limpar hora');
        expect(ptLabels.dateTimePicker.placeholder).toBe(
            'Escolha a data e a hora',
        );
    });
});
