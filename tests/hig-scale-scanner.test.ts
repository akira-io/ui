import { describe, expect, it } from 'vitest';
import { scaleViolations } from './helpers/hig-scale';

describe('scaleViolations', () => {
    it.each([
        ['"p-4 flex"', ['p-4']],
        ["'gap-2 px-3'", ['gap-2', 'px-3']],
        ['"md:p-6"', ['md:p-6']],
        ['"group-data-[x]:gap-1.5"', ['group-data-[x]:gap-1.5']],
        ['"space-y-2"', ['space-y-2']],
        ['"!p-4"', ['p-4']],
        ['"[&>svg]:size-4"', ['[&>svg]:size-4']],
        [
            "`[&_svg:not([class*='size-'])]:size-5`",
            ["[&_svg:not([class*='size-'])]:size-5"],
        ],
    ])('flags %s', (source, expected) => {
        expect(scaleViolations(source)).toEqual(expected);
    });

    it.each([
        '"p-inset gap-item px-inset"',
        '"p-0 gap-0 px-px py-0.5"',
        '"-ml-1 -mt-0.5"',
        '"top-4 w-4 h-6 translate-x-2 size-4 rounded-xl"',
        '"[&>svg]:size-icon"',
        '"min-h-target"',
    ])('accepts %s', (source) => {
        expect(scaleViolations(source)).toEqual([]);
    });
});
