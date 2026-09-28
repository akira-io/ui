import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function readStylesheet(relativePath: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../../${relativePath}`, import.meta.url)),
        'utf8',
    );
}

export function declarationsIn(
    css: string,
    selector: string,
): Record<string, string> {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const block = stripped.match(
        new RegExp(`(?:^|[};])\\s*${escaped}\\s*\\{([^}]*)\\}`),
    );

    if (!block) {
        throw new Error(`selector not found: ${selector}`);
    }

    const declarations: Record<string, string> = {};

    for (const line of block[1].split(';')) {
        const [property, ...rest] = line.split(':');
        const value = rest.join(':').trim();

        if (property.trim().startsWith('--') && value) {
            declarations[property.trim()] = value;
        }
    }

    return declarations;
}

export interface CssRule {
    selector: string;
    body: string;
}

export function unlayeredRules(css: string): CssRule[] {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const rules: CssRule[] = [];
    let depth = 0;
    let prelude = '';
    let body = '';

    for (const char of stripped) {
        if (char === '{') {
            depth++;

            if (depth === 1) {
                body = '';
                continue;
            }
        }

        if (char === '}') {
            depth--;

            if (depth === 0) {
                const selector = prelude.trim().replace(/\s+/g, ' ');

                if (!selector.startsWith('@')) {
                    rules.push({ selector, body: body.trim() });
                }

                prelude = '';
                continue;
            }
        }

        if (depth === 0) {
            prelude = char === ';' ? '' : prelude + char;
        } else {
            body += char;
        }
    }

    return rules;
}

export function resolveVar(
    value: string,
    scopes: Record<string, string>[],
): string {
    const reference = value.trim().match(/^var\(\s*(--[\w-]+)\s*\)$/);

    if (!reference) {
        return value.trim();
    }

    for (const scope of scopes) {
        if (reference[1] in scope) {
            return resolveVar(scope[reference[1]], scopes);
        }
    }

    throw new Error(`unresolved variable: ${reference[1]}`);
}
