export interface SlotColumn {
    key: string;
    previous?: string;
    next?: string;
    digit: boolean;
}

export const slotStagger = 0.06;

const DIGIT = /^[0-9]$/;

export function alignCharacters(previous: string, next: string): SlotColumn[] {
    const before = [...previous];
    const after = [...next];

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

        const delay = changed * slotStagger;

        changed += 1;

        return delay;
    });
}
