import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function nestedSurfaceSelector(): string {
    const match = readFileSync(
        resolve(process.cwd(), 'theme.css'),
        'utf8',
    ).match(/@custom-variant nested-surface \(\s*&:is\(([\s\S]+?)\)\s*\);/);

    if (!match?.[1]) {
        throw new Error('theme.css declares no nested-surface variant');
    }

    return match[1];
}

export function slot(name: string): HTMLElement {
    const element = document.querySelector<HTMLElement>(
        `[data-slot="${name}"]`,
    );

    if (!element) {
        throw new Error(`nothing rendered the ${name} slot`);
    }

    return element;
}
