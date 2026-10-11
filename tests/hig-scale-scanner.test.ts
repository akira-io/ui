import { describe, expect, it } from 'vitest';
import { scaleViolations } from './helpers/hig-scale';

describe('spacing violations', () => {
    it.each([
        ['"p-4 flex"', ['p-4']],
        ["'gap-2 px-3'", ['gap-2', 'px-3']],
        ['"md:p-6"', ['md:p-6']],
        ['"group-data-[x]:gap-1.5"', ['group-data-[x]:gap-1.5']],
        ['"space-y-2"', ['space-y-2']],
        ['"!p-4"', ['p-4']],
    ])('flags %s', (source, expected) => {
        expect(scaleViolations(source).spacing).toEqual(expected);
    });

    it.each([
        '"p-inset gap-item px-inset"',
        '"p-0 gap-0 px-px py-0.5"',
        '"-ml-1 -mt-0.5"',
        '"top-4 w-4 h-6 translate-x-2 size-4 rounded-xl"',
        '"min-h-target"',
    ])('accepts %s', (source) => {
        expect(scaleViolations(source).spacing).toEqual([]);
    });
});

describe('icon selector violations', () => {
    it.each([
        ['"[&>svg]:size-4"', ['[&>svg]:size-4']],
        [
            "`[&_svg:not([class*='size-'])]:size-5`",
            ["[&_svg:not([class*='size-'])]:size-5"],
        ],
    ])('flags %s', (source, expected) => {
        expect(scaleViolations(source).icon).toEqual(expected);
    });

    it('flags an svg selector sized by width and height', () => {
        expect(scaleViolations('"[&>svg]:h-3 [&>svg]:w-3"').icon).toEqual([
            '[&>svg]:h-3',
            '[&>svg]:w-3',
        ]);
    });

    it('accepts the icon tokens', () => {
        expect(scaleViolations('"[&>svg]:size-icon"').icon).toEqual([]);
    });
});

describe('icon elements', () => {
    const file = (body: string) =>
        `import { Search, ChevronDown as Chevron } from 'lucide-react';\n${body}`;

    it('flags a lucide icon sized with a number', () => {
        expect(
            scaleViolations(file('<Search className="size-4" />')).icon,
        ).toEqual(['Search size-4']);
    });

    it('recognises an icon imported under another name', () => {
        expect(
            scaleViolations(file('<Chevron className="ml-auto size-3.5" />'))
                .icon,
        ).toEqual(['Chevron size-3.5']);
    });

    it('accepts the icon tokens, decorative dots and illustrations', () => {
        expect(
            scaleViolations(
                file(
                    '<Search className="size-icon" /><Search className="size-2" /><Search className="size-8" />',
                ),
            ).icon,
        ).toEqual([]);
    });

    it('leaves components that are not lucide icons alone', () => {
        expect(
            scaleViolations(
                file(
                    '<Avatar className="size-8" /><Badge className="size-4" />',
                ),
            ).icon,
        ).toEqual([]);
    });

    it('flags a lucide icon sized by width and height', () => {
        expect(
            scaleViolations(file('<Search className="ml-2 h-4 w-4" />')).icon,
        ).toEqual(['Search h-4', 'Search w-4']);
    });

    it('flags an icon component passed in as a prop or from data', () => {
        expect(
            scaleViolations(
                '<Icon className="size-5" /><item.icon className="mr-2 size-4" />',
            ).icon,
        ).toEqual(['Icon size-5', 'item.icon size-4']);
    });

    it('reads every size of a conditional class and props after an arrow', () => {
        expect(
            scaleViolations(
                "<Icon onClick={() => go()} className={compact ? 'size-4' : 'size-5'} />",
            ).icon,
        ).toEqual(['Icon size-4', 'Icon size-5']);
    });
});
