import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PROPS_TYPES_BY_ENTRY = [
    ['index', 'ConfirmDialogProps'],
    ['index', 'DropzoneProps'],
    ['index', 'FieldProps'],
    ['index', 'PasswordInputProps'],
    ['data-table', 'DataTableProps'],
    ['shells', 'AppContentProps'],
    ['shells', 'AppShellProps'],
    ['shells', 'AppSidebarHeaderProps'],
    ['shells', 'AppSidebarProps'],
] as const;

function exportedNames(entry: string): string[] {
    const declaration = readFileSync(
        fileURLToPath(new URL(`../dist/${entry}.d.ts`, import.meta.url)),
        'utf8',
    );

    return [...declaration.matchAll(/export\s*{([^}]*)}/g)]
        .flatMap((match) => match[1].split(','))
        .map((specifier) => specifier.trim().replace(/^type\s+/, ''))
        .map((specifier) => specifier.split(/\s+as\s+/).pop() ?? '')
        .filter(Boolean);
}

describe('the component props a consumer wraps', () => {
    it.each(PROPS_TYPES_BY_ENTRY)(
        'ships from the built %s entry: %s',
        (entry, name) => {
            expect(exportedNames(entry)).toContain(name);
        },
    );
});
