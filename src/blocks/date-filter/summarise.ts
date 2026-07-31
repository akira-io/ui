import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import type {
    DateFilterLabels,
    DateFilterOption,
    DateFilterValue,
} from '@/blocks/date-filter/types';

const readable = (value?: string) =>
    value
        ? format(new Date(`${value}T00:00:00`), "d 'de' MMMM 'de' yyyy", {
              locale: pt,
          })
        : '';

export function summariseDateFilter(
    value: DateFilterValue,
    presets: DateFilterOption[],
    operators: DateFilterOption[],
    units: DateFilterOption[],
    labels: DateFilterLabels,
): string {
    if (value.mode === 'preset') {
        return (
            presets.find((preset) => preset.value === value.preset)?.label ??
            labels.fallback
        );
    }

    if (value.mode === 'fixed') {
        const operator =
            operators.find((item) => item.value === value.operator)?.label ??
            '';

        return value.operator === 'between'
            ? `${readable(value.start)} - ${readable(value.end)}`
            : `${operator} ${readable(value.start)}`;
    }

    if (value.mode === 'relative') {
        const unitLabel = (unit?: string) =>
            units.find((item) => item.value === unit)?.label ?? '';

        const base = `${labels.latest} ${value.amount ?? 1} ${unitLabel(value.unit)}`;

        return (value.offset_amount ?? 0) > 0
            ? `${base}, ${labels.ago} ${value.offset_amount} ${unitLabel(value.offset_unit ?? value.unit)}`
            : base;
    }

    return labels.all;
}
