const LINE_OPEN = '<span class="line">';

const SPAN_CLOSE = '</span>';

export function splitSourceLines(code: string): string[] {
    return code.replace(/\n$/, '').split('\n');
}

export function parseLineRanges(
    spec: string | number[] | undefined,
): Set<number> {
    const lines = new Set<number>();

    if (spec === undefined) {
        return lines;
    }

    if (Array.isArray(spec)) {
        for (const line of spec) {
            lines.add(line);
        }

        return lines;
    }

    for (const part of spec.split(',')) {
        const [from, to] = part
            .split('-')
            .map((bound) => Number.parseInt(bound.trim(), 10));

        if (Number.isNaN(from)) {
            continue;
        }

        const last = to === undefined || Number.isNaN(to) ? from : to;

        for (let line = from; line <= last; line += 1) {
            lines.add(line);
        }
    }

    return lines;
}

function closingSpan(html: string, from: number): number {
    let depth = 0;
    let cursor = from;

    while (cursor < html.length) {
        const open = html.indexOf('<span', cursor);
        const close = html.indexOf(SPAN_CLOSE, cursor);

        if (close === -1) {
            return -1;
        }

        if (open !== -1 && open < close) {
            depth += 1;
            cursor = open + 5;
            continue;
        }

        if (depth === 0) {
            return close;
        }

        depth -= 1;
        cursor = close + SPAN_CLOSE.length;
    }

    return -1;
}

export function splitHighlightedLines(html: string): string[] | null {
    const lines: string[] = [];
    let cursor = html.indexOf(LINE_OPEN);

    while (cursor !== -1) {
        const start = cursor + LINE_OPEN.length;
        const end = closingSpan(html, start);

        if (end === -1) {
            return null;
        }

        lines.push(html.slice(start, end));
        cursor = html.indexOf(LINE_OPEN, end);
    }

    return lines.length > 0 ? lines : null;
}
