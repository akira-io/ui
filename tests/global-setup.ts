import { execSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export default function setup(): void {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

    execSync('bun run build', { cwd: root, stdio: 'inherit' });
}
