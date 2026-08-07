import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SPACING_STEP = 4;
const REM = 16;

const source = readFileSync(
    fileURLToPath(new URL('../src/components/ui/sidebar.tsx', import.meta.url)),
    'utf8',
);

const ICON_MODE = 'group-data-\\[collapsible=icon\\]:';

function componentBody(component: string): string {
    const start = source.indexOf(`function ${component}(`);

    if (start < 0) {
        throw new Error(`component not found: ${component}`);
    }

    const next = source.indexOf('\nfunction ', start + 1);

    return source.slice(start, next === -1 ? source.length : next);
}

function iconTokenWidth(): number {
    const match = /const SIDEBAR_WIDTH_ICON = '([\d.]+)rem'/.exec(source);

    if (!match) {
        throw new Error('SIDEBAR_WIDTH_ICON is no longer a rem literal');
    }

    return Number(match[1]) * REM;
}

function resolveLength(expression: string): number {
    const resolved = expression
        .replace(/var\(--sidebar-width-icon\)/g, `${iconTokenWidth()}px`)
        .replace(
            /--spacing\((\d+)\)/g,
            (_, steps: string) => `${Number(steps) * SPACING_STEP}px`,
        );

    let total = 0;

    for (const [, sign, amount] of resolved.matchAll(/([+-])?\s*([\d.]+)px/g)) {
        total += (sign === '-' ? -1 : 1) * Number(amount);
    }

    return total;
}

function scale(className: string, classes: string): number | undefined {
    const match = new RegExp(
        `(?:^|[\\s'"\`])${className}-(\\d+(?:\\.\\d+)?)!?(?![\\w.-])`,
    ).exec(classes);

    return match ? Number(match[1]) * SPACING_STEP : undefined;
}

function iconMode(classes: string): string {
    return [...classes.matchAll(new RegExp(`${ICON_MODE}(\\S+)`, 'g'))]
        .map((match) => match[1])
        .join(' ');
}

function expandedOnly(classes: string): string {
    return classes.replace(new RegExp(`${ICON_MODE}\\S+`, 'g'), '');
}

function paddingX(classes: string): number {
    const padding = scale('px', classes) ?? scale('p', classes) ?? 0;

    return padding * 2;
}

function collapsedPaddingX(classes: string): number {
    const override = iconMode(classes);

    return /(?:^|\s)p[xltrb]?-/.test(override)
        ? paddingX(override)
        : paddingX(expandedOnly(classes));
}

const insetFrame =
    /\?\s*'(p-2 [^']*group-data-\[collapsible=icon\]:w-\[calc\(([^\]]+)\)\][^']*)'/.exec(
        componentBody('Sidebar'),
    );

const plainRail =
    /:\s*'group-data-\[collapsible=icon\]:w-\(--sidebar-width-icon\)/.test(
        componentBody('Sidebar'),
    );

function railInnerWidth(variant: 'inset' | 'sidebar'): number {
    if (variant === 'sidebar') {
        if (!plainRail) {
            throw new Error('the plain variant no longer sets a rail width');
        }

        return iconTokenWidth();
    }

    if (!insetFrame) {
        throw new Error('the inset variant no longer sets a rail width');
    }

    return resolveLength(insetFrame[2]) - paddingX(expandedOnly(insetFrame[1]));
}

const RAIL_PARTS = ['SidebarHeader', 'SidebarFooter', 'SidebarGroup'] as const;

type RailPart = (typeof RAIL_PARTS)[number];

function availableWidth(variant: 'inset' | 'sidebar', part: RailPart): number {
    return railInnerWidth(variant) - collapsedPaddingX(componentBody(part));
}

const RAILS = RAIL_PARTS.flatMap((part) =>
    (['inset', 'sidebar'] as const).map((variant) => ({ part, variant })),
);

const buttonMatch = /^\s*'(peer\/menu-button[^']*)'/m.exec(
    source.slice(source.indexOf('const sidebarMenuButtonVariants')),
);

if (!buttonMatch) {
    throw new Error('the menu button base classes are no longer a literal');
}

const buttonClasses = buttonMatch[1];

const collapsedButton = iconMode(buttonClasses);

const LABEL_BASIS = [4, 20, 60, 200];

function buttonWidth(): number {
    const size = scale('size', collapsedButton);

    if (size === undefined) {
        throw new Error('the collapsed menu button no longer sets a size');
    }

    return size;
}

function iconSize(): number {
    const size = scale(
        'size',
        /\[&>svg\]:(size-\d+)/.exec(buttonClasses)?.[1] ?? '',
    );

    if (size === undefined) {
        throw new Error('the menu button no longer sizes its icon');
    }

    return size;
}

function centresItsContent(classes: string): boolean {
    return /(?:^|\s)justify-center(?:\s|$)/.test(classes);
}

function labelIsHidden(): boolean {
    return /\[&>span:last-child\]:hidden/.test(collapsedButton);
}

interface Row {
    icon: number;
    gap: number;
    label: number;
}

function layout(labelBasis: number, withIcon = true): Row {
    const padding = collapsedPaddingX(buttonClasses);
    const content = buttonWidth() - padding;
    const icon = withIcon ? iconSize() : 0;
    const gap =
        scale('gap', collapsedButton) ?? scale('gap', buttonClasses) ?? 0;

    if (labelIsHidden()) {
        return { icon, gap: 0, label: 0 };
    }

    const spacing = icon && labelBasis ? gap : 0;
    const deficit = icon + spacing + labelBasis - content;

    return {
        icon,
        gap: spacing,
        label: Math.max(0, labelBasis - Math.max(0, deficit)),
    };
}

function iconOffsets(): { left: number; right: number } {
    const width = buttonWidth();
    const padding = collapsedPaddingX(buttonClasses) / 2;
    const content = width - padding * 2;
    const row = layout(Math.max(...LABEL_BASIS));
    const occupied = row.icon + row.gap + row.label;
    const left =
        padding +
        (centresItsContent(collapsedButton) ? (content - occupied) / 2 : 0);

    return { left, right: width - left - row.icon };
}

function menuAlignment(): string {
    return /items-center/.test(iconMode(componentBody('SidebarMenu')))
        ? 'center'
        : 'stretch';
}

describe('the collapsed icon rail', () => {
    it('keeps the public width token', () => {
        expect(/const SIDEBAR_WIDTH_ICON = '3rem'/.test(source)).toBe(true);
    });

    it.each(RAILS)(
        'leaves $part on the $variant variant at least as wide as the menu button',
        ({ part, variant }) => {
            expect(availableWidth(variant, part)).toBeGreaterThanOrEqual(
                buttonWidth(),
            );
        },
    );

    it.each(RAIL_PARTS)('drops the horizontal padding of %s', (part) => {
        expect(collapsedPaddingX(componentBody(part))).toBe(0);
    });

    it.each(RAIL_PARTS)('leaves the expanded padding of %s alone', (part) => {
        expect(paddingX(expandedOnly(componentBody(part)))).toBe(16);
    });

    it('centres the menu button in the rail rather than stretching it', () => {
        expect(menuAlignment()).toBe('center');
    });

    it.each(RAILS)(
        'leaves an equal margin either side of the button in $part on the $variant variant',
        ({ part, variant }) => {
            const slack = availableWidth(variant, part) - buttonWidth();

            expect(slack).toBeGreaterThanOrEqual(0);
            expect(slack % 2).toBe(0);
        },
    );

    it('centres the icon inside the button', () => {
        const { left, right } = iconOffsets();

        expect(left).toBe(right);
    });

    it('never asks the button to hold more than it has room for', () => {
        const padding = collapsedPaddingX(buttonClasses);
        const gap = scale('gap', collapsedButton) ?? 0;

        expect(buttonWidth() - padding - gap).toBeGreaterThanOrEqual(
            iconSize(),
        );
    });

    it.each(LABEL_BASIS)(
        'shows no part of a %spx label next to an icon',
        (basis) => {
            expect(layout(basis).label).toBe(0);
        },
    );

    it.each(LABEL_BASIS)(
        'shows no part of a %spx label on an item with no icon',
        (basis) => {
            expect(layout(basis, false).label).toBe(0);
        },
    );
});
