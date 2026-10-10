import { slotStagger, slotStaggerColumns } from '@/lib/motion/tokens';

export interface SlotColumn {
    key: string;
    previous?: string;
    next?: string;
    digit: boolean;
}

export { slotStagger };

const DIGIT = /^[0-9]$/;

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

function charactersOf(value: string): string[] {
    return [...graphemes.segment(value)].map((part) => part.segment);
}

export function alignCharacters(previous: string, next: string): SlotColumn[] {
    const before = charactersOf(previous);
    const after = charactersOf(next);

    return after.map((character, index) => {
        const fromRight = after.length - 1 - index;

        return {
            key: `c${fromRight}`,
            previous: before[before.length - 1 - fromRight],
            next: character,
            digit: DIGIT.test(character),
        };
    });
}

export function columnDelays(columns: SlotColumn[]): number[] {
    let changed = 0;

    return columns.map((column) => {
        if (column.previous === column.next) {
            return 0;
        }

        const delay = Math.min(changed, slotStaggerColumns) * slotStagger;

        changed += 1;

        return delay;
    });
}
