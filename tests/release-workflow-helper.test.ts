import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    createReleaseSandbox,
    type ReleaseSandbox,
} from './helpers/release-workflow';

let sandbox: ReleaseSandbox;

beforeEach(() => {
    sandbox = createReleaseSandbox();
});

afterEach(() => {
    sandbox.dispose();
});

describe('runStep scoped to a job', () => {
    it('does not reach into a later job for a step its own job lacks', () => {
        expect(() =>
            sandbox.runStep('Pack the package', 'v3.2.0', { job: 'release' }),
        ).toThrow('missing step: Pack the package');
    });
});
