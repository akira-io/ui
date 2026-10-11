import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));

function sources(dir: string): string[] {
    return readdirSync(`${ROOT}${dir}`).flatMap((entry) => {
        const path = `${dir}/${entry}`;

        if (statSync(`${ROOT}${path}`).isDirectory()) {
            return sources(path);
        }

        return /\.tsx?$/.test(entry) && !/\.(test|typecheck)\.tsx?$/.test(entry)
            ? [path]
            : [];
    });
}

export function componentSources(): string[] {
    return ['src/components/ui', 'src/blocks', 'src/shells'].flatMap(sources);
}

export function readSource(file: string): string {
    return readFileSync(`${ROOT}${file}`, 'utf8');
}
