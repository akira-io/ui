import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PROP_TABLE_HEADER = /^\|\s*(?:Part|Component)\s*\|\s*Prop\s*\|/;
const TABLE_DIVIDER = /^\|[\s:|-]+\|\s*$/;
const PROP_NAME = /`([A-Za-z_$][\w$]*)`/g;
const DECLARED_PROP = /^\s*(?:readonly\s+)?([A-Za-z_$][\w$]*)\??\s*:/;

interface Contract {
    doc: string;
    component: string;
    source: string;
    type: string;
}

const CONTRACTS: Contract[] = [
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Root',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormRootProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Status',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormStatusProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Email',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormEmailProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Password',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormPasswordProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Remember',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormRememberProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginForm.Submit',
        source: 'blocks/login-form/parts.tsx',
        type: 'LoginFormSubmitProps',
    },
    {
        doc: '08-blocks.md',
        component: 'LoginFormPreset',
        source: 'blocks/login-form/preset.tsx',
        type: 'LoginFormPresetProps',
    },
    {
        doc: '08-blocks.md',
        component: 'InertiaLoginForm',
        source: 'inertia.ts',
        type: 'InertiaLoginForm',
    },
    {
        doc: '04-shells.md',
        component: 'AuthShellPanel',
        source: 'shells/auth-shell.tsx',
        type: 'AuthShellPanelProps',
    },
];

function readDoc(name: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../docs/${name}`, import.meta.url)),
        'utf8',
    );
}

function readSource(name: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../src/${name}`, import.meta.url)),
        'utf8',
    );
}

function bodyAt(source: string, open: number): string {
    let depth = 0;

    for (let index = open; index < source.length; index += 1) {
        if (source[index] === '{') {
            depth += 1;
            continue;
        }

        if (source[index] === '}') {
            depth -= 1;

            if (depth === 0) {
                return source.slice(open + 1, index);
            }
        }
    }

    throw new Error('unbalanced braces while reading a prop declaration');
}

function propsBody(source: string, name: string): string {
    const declaration = source.indexOf(`export interface ${name} {`);

    if (declaration >= 0) {
        return bodyAt(source, source.indexOf('{', declaration));
    }

    const fn = source.indexOf(`export function ${name}(`);

    if (fn < 0) {
        throw new Error(`no exported interface or function named ${name}`);
    }

    const inline = source.indexOf('}: {', fn);

    if (inline < 0) {
        throw new Error(`${name} declares no inline props object`);
    }

    return bodyAt(source, inline + 3);
}

function declaredProps(contract: Contract): string[] {
    const source = readSource(contract.source);
    const names = new Set<string>();
    let depth = 0;

    for (const line of propsBody(source, contract.type).split('\n')) {
        const match = depth === 0 ? DECLARED_PROP.exec(line) : null;

        if (match) {
            names.add(match[1]);
        }

        depth += line.split('{').length - line.split('}').length;
    }

    if (names.size === 0) {
        throw new Error(`read no props from ${contract.type}`);
    }

    if (source.includes(`${contract.type} & SlotNameProps`)) {
        names.add('slotName');
    }

    return [...names].sort();
}

function documentedProps(doc: string): Map<string, string[]> {
    const tables = new Map<string, string[]>();
    let inTable = false;
    let component = '';

    for (const line of readDoc(doc).split('\n')) {
        if (PROP_TABLE_HEADER.test(line)) {
            inTable = true;
            component = '';
            continue;
        }

        if (!inTable) {
            continue;
        }

        if (!line.startsWith('|')) {
            inTable = false;
            continue;
        }

        if (TABLE_DIVIDER.test(line)) {
            continue;
        }

        const cells = line.split('|').slice(1, -1);
        const named = cells[0].trim().replaceAll('`', '');

        if (named) {
            component = named;
            tables.set(component, tables.get(component) ?? []);
        }

        if (!component) {
            continue;
        }

        for (const match of cells[1].matchAll(PROP_NAME)) {
            tables.get(component)!.push(match[1]);
        }
    }

    return tables;
}

const documented = new Map(
    [...new Set(CONTRACTS.map((contract) => contract.doc))].map((doc) => [
        doc,
        documentedProps(doc),
    ]),
);

describe('auth prop tables', () => {
    it('reads the tables out of the documentation, so a renamed header fails here first', () => {
        const missing = CONTRACTS.filter(
            (contract) =>
                !documented.get(contract.doc)!.has(contract.component),
        ).map((contract) => contract.component);

        expect(missing).toEqual([]);
    });

    it('reads the props out of the source, so a renamed type fails here first', () => {
        expect(declaredProps(CONTRACTS[0]).includes('linkComponent')).toBe(
            true,
        );
        expect(declaredProps(CONTRACTS[0])).toContain('slotName');
    });

    it.each(CONTRACTS)('documents every prop of $component', (contract) => {
        const rows =
            documented.get(contract.doc)!.get(contract.component) ?? [];

        expect(rows).toEqual([...new Set(rows)]);
        expect([...rows].sort()).toEqual(declaredProps(contract));
    });
});
