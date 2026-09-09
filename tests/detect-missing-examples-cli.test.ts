import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { findMissingExamples } from '../scripts/detect-missing-examples.mjs';
import {
    makeFixture,
    type MissingExamplesFixture,
} from './helpers/missing-examples-fixture';

const DETECTOR = new URL(
    '../scripts/detect-missing-examples.mjs',
    import.meta.url,
).pathname;

describe('detect-missing-examples CLI', () => {
    let fixture: MissingExamplesFixture;

    afterEach(() => {
        fixture.remove();
    });

    function run() {
        return spawnSync(
            process.execPath,
            [DETECTOR, fixture.uiRoot, fixture.siteRoot],
            { encoding: 'utf8' },
        );
    }

    it('prints the entries as the single line the workflow carries', () => {
        fixture = makeFixture();

        const result = run();

        expect(result.status).toBe(0);
        expect(result.stdout.trimEnd().split('\n')).toHaveLength(1);
        expect(JSON.parse(result.stdout)).toEqual(
            findMissingExamples(fixture.uiRoot, fixture.siteRoot),
        );
    });

    it('writes nothing into the site checkout', () => {
        fixture = makeFixture();

        run();

        expect(
            existsSync(
                join(fixture.siteRoot, 'src/demos/components/akira-mark'),
            ),
        ).toBe(false);
    });

    it('fails loudly when the site baseline is malformed', () => {
        fixture = makeFixture();
        fixture.writeBaseline({ components: 'akira-mark' } as never);

        const result = run();

        expect(result.status).not.toBe(0);
        expect(result.stdout).toBe('');
    });
});
