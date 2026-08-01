import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const uiDir = fileURLToPath(new URL('../src/components/ui', import.meta.url));

const WITHOUT_MARKUP = ['icon.tsx', 'sonner.tsx'];

function componentFiles(): string[] {
    return readdirSync(uiDir)
        .filter((name) => name.endsWith('.tsx'))
        .filter((name) => !name.endsWith('.test.tsx'))
        .filter((name) => !WITHOUT_MARKUP.includes(name))
        .sort();
}

describe('data slots', () => {
    it.each(componentFiles())('%s marks its parts with data-slot', (name) => {
        const source = readFileSync(`${uiDir}/${name}`, 'utf8');

        expect(source).toMatch(/data-slot="[a-z-]+"/);
    });

    it('keeps the exemption list free of files that now render markup', () => {
        for (const name of WITHOUT_MARKUP) {
            const source = readFileSync(`${uiDir}/${name}`, 'utf8');

            expect(source).not.toMatch(/data-slot="[a-z-]+"/);
        }
    });
});
