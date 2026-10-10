import {
    execFileSync,
    spawnSync,
    type SpawnSyncReturns,
} from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect } from 'vitest';

const releaseWorkflow = readFileSync(
    new URL('../../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function stepScript(stepName: string): string {
    const start = releaseWorkflow.indexOf(`      - name: ${stepName}\n`);

    expect(start, `missing step: ${stepName}`).toBeGreaterThanOrEqual(0);

    const end = releaseWorkflow.slice(start + 1).search(/\n {6}- |\n {2}\S/);
    const step = releaseWorkflow.slice(
        start,
        end === -1 ? undefined : start + 1 + end,
    );
    const marker = '        run: |\n';
    const run = step.indexOf(marker);

    expect(run, `step without a run block: ${stepName}`).toBeGreaterThan(0);

    const body: string[] = [];

    for (const line of step.slice(run + marker.length).split('\n')) {
        if (line.trim() !== '' && !line.startsWith('          ')) {
            break;
        }

        body.push(line.slice(10));
    }

    return body.join('\n');
}

type StepOptions = {
    env?: NodeJS.ProcessEnv;
    expressions?: Record<string, string>;
};

export type ReleaseSandbox = {
    root: string;
    remote: string;
    maintainer: string;
    runner: string;
    git: (cwd: string, ...args: string[]) => string;
    commitFile: (path: string, content: string, message: string) => void;
    onRemote: (...args: string[]) => string;
    pushBranch: (branch: string) => void;
    cutRelease: (version: string) => void;
    tagAndPush: (tag: string) => void;
    checkoutTagInRunner: (tag: string) => void;
    runStep: (
        stepName: string,
        tag: string,
        options?: StepOptions,
    ) => SpawnSyncReturns<string>;
    dispose: () => void;
};

export function createReleaseSandbox(): ReleaseSandbox {
    const root = mkdtempSync(join(tmpdir(), 'release-guard-'));
    const remote = join(root, 'remote.git');
    const maintainer = join(root, 'maintainer');
    const runner = join(root, 'runner');
    const globalConfig = join(root, 'gitconfig');

    writeFileSync(
        globalConfig,
        '[user]\n\tname = Maintainer\n\temail = maintainer@example.test\n',
    );

    const gitEnv: NodeJS.ProcessEnv = {
        ...Object.fromEntries(
            Object.entries(process.env).filter(
                ([key]) => !key.startsWith('GIT_'),
            ),
        ),
        GIT_CONFIG_GLOBAL: globalConfig,
        GIT_CONFIG_NOSYSTEM: '1',
    };

    const git = (cwd: string, ...args: string[]): string =>
        execFileSync('git', args, {
            cwd,
            env: gitEnv,
            encoding: 'utf8',
        }).trim();

    const commitFile = (path: string, content: string, message: string) => {
        writeFileSync(join(maintainer, path), content);
        git(maintainer, 'add', path);
        git(maintainer, 'commit', '-q', '-m', message);
    };

    git(root, 'init', '-q', '--bare', '-b', 'main', remote);
    git(root, 'init', '-q', '-b', 'main', maintainer);
    git(maintainer, 'remote', 'add', 'origin', remote);
    commitFile(
        'package.json',
        '{"version":"3.1.0"}\n',
        'chore(release): v3.1.0',
    );
    git(maintainer, 'push', '-q', 'origin', 'main');

    return {
        root,
        remote,
        maintainer,
        runner,
        git,
        commitFile,
        onRemote: (...args) => git(remote, ...args),
        pushBranch(branch) {
            git(maintainer, 'push', '-q', 'origin', branch);
        },
        cutRelease(version) {
            git(
                maintainer,
                'checkout',
                '-q',
                '-b',
                `release/${version}`,
                'main',
            );
            commitFile(
                'package.json',
                `{"version":"${version}"}\n`,
                `chore(release): v${version}`,
            );
            git(maintainer, 'push', '-q', 'origin', `release/${version}`);
        },
        tagAndPush(tag) {
            git(maintainer, 'tag', tag);
            git(maintainer, 'push', '-q', 'origin', `refs/tags/${tag}`);
        },
        checkoutTagInRunner(tag) {
            git(root, 'clone', '-q', remote, 'runner');
            git(runner, 'checkout', '-q', `refs/tags/${tag}`);
        },
        runStep(stepName, tag, { env = {}, expressions = {} } = {}) {
            const script = Object.entries({
                'github.ref_name': tag,
                ...expressions,
            }).reduce(
                (text, [expression, value]) =>
                    text.replaceAll(`\${{ ${expression} }}`, () => value),
                stepScript(stepName),
            );

            return spawnSync(
                'bash',
                ['--noprofile', '--norc', '-eo', 'pipefail', '-c', script],
                {
                    cwd: runner,
                    env: {
                        ...gitEnv,
                        GITHUB_REF_NAME: tag,
                        GITHUB_ACTOR: 'release-bot',
                        ...env,
                    },
                    encoding: 'utf8',
                },
            );
        },
        dispose() {
            rmSync(root, { recursive: true, force: true });
        },
    };
}
