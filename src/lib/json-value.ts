export type JsonKind =
    | 'string'
    | 'number'
    | 'boolean'
    | 'null'
    | 'object'
    | 'array'
    | 'unsupported';

const CIRCULAR_MARKER = '[Circular]';

export function jsonKind(value: unknown): JsonKind {
    if (value === null) {
        return 'null';
    }

    if (Array.isArray(value)) {
        return 'array';
    }

    switch (typeof value) {
        case 'string':
            return 'string';
        case 'number':
            return Number.isFinite(value) ? 'number' : 'unsupported';
        case 'boolean':
            return 'boolean';
        case 'object':
            return 'object';
        default:
            return 'unsupported';
    }
}

export function isBranch(kind: JsonKind): boolean {
    return kind === 'object' || kind === 'array';
}

export function entriesOf(value: unknown): [string, unknown][] {
    if (Array.isArray(value)) {
        return value.map((item, index) => [String(index), item]);
    }

    if (value !== null && typeof value === 'object') {
        return Object.entries(value as Record<string, unknown>);
    }

    return [];
}

function serialisable(value: unknown, ancestors: readonly object[]): unknown {
    if (typeof value === 'bigint') {
        return value.toString();
    }

    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (ancestors.includes(value)) {
        return CIRCULAR_MARKER;
    }

    const trail = [...ancestors, value];

    if (Array.isArray(value)) {
        return value.map((item) => serialisable(item, trail));
    }

    return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
            key,
            serialisable(item, trail),
        ]),
    );
}

export function stringifyJson(value: unknown): string {
    return JSON.stringify(serialisable(value, []), null, 2) ?? 'null';
}
