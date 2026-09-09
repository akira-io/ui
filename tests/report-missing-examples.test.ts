import { describe, expect, it, vi } from 'vitest';
import {
    MARKER_END,
    MARKER_START,
    normalize,
    parseEntries,
    readRecordedEntries,
    renderBlock,
    renderBody,
    replaceBlock,
    reportMissingExamples,
} from '../scripts/report-missing-examples.mjs';

const AKIRA_MARK = {
    group: 'components',
    slug: 'akira-mark',
    specifier: '@akira-io/ui',
};
const LOGIN_FORM = {
    group: 'blocks',
    slug: 'login-form',
    specifier: '@akira-io/ui/blocks',
};

const REPO = 'kidiatoliny/ui';
const TITLE = 'Exports without a site example';
const RUN_URL = 'https://example.test/run/1';

function report(
    entries: unknown[],
    responses: { open?: unknown[]; body?: string } = {},
) {
    const gh = vi.fn((args: string[]) => {
        if (args[1] === 'list') return JSON.stringify(responses.open ?? []);
        if (args[1] === 'view') {
            return JSON.stringify({ body: responses.body ?? '' });
        }

        return '';
    });

    const outcome = reportMissingExamples({
        entries,
        repo: REPO,
        title: TITLE,
        runUrl: RUN_URL,
        gh,
    });

    return {
        outcome,
        calls: gh.mock.calls.map(([args]) => args),
        verbs: gh.mock.calls.map(([args]) => `${args[0]} ${args[1]}`),
    };
}

function bodyFor(entries: unknown[], notes = '') {
    return [notes, renderBlock(entries, RUN_URL), 'footer'].join('\n');
}

describe('parseEntries', () => {
    it('refuses anything that is not a JSON array', () => {
        expect(() => parseEntries('{"group":"components"}')).toThrow(
            'the detector produced no JSON array',
        );
    });
});

describe('normalize', () => {
    it('orders by group and slug so a reordered barrel reads the same', () => {
        expect(normalize([LOGIN_FORM, AKIRA_MARK])).toEqual(
            normalize([AKIRA_MARK, LOGIN_FORM]),
        );
    });
});

describe('readRecordedEntries', () => {
    it('reads back exactly what renderBlock wrote', () => {
        const body = renderBody([AKIRA_MARK, LOGIN_FORM], RUN_URL);

        expect(readRecordedEntries(body)).toEqual(
            normalize([AKIRA_MARK, LOGIN_FORM]),
        );
    });

    it('reads the block through carriage returns', () => {
        const body = renderBody([AKIRA_MARK], RUN_URL).replace(/\n/g, '\r\n');

        expect(readRecordedEntries(body)).toEqual([AKIRA_MARK]);
    });

    it('ignores an array that sits outside the block', () => {
        const body = `[{"group":"components"}]\n${renderBody([AKIRA_MARK], RUN_URL)}`;

        expect(readRecordedEntries(body)).toEqual([AKIRA_MARK]);
    });

    it('returns nothing when the block never closes', () => {
        const body = renderBody([AKIRA_MARK], RUN_URL).replace(MARKER_END, '');

        expect(readRecordedEntries(body)).toBeNull();
    });

    it('returns nothing when the recorded list is not JSON', () => {
        const body = [MARKER_START, '[broken', MARKER_END].join('\n');

        expect(readRecordedEntries(body)).toBeNull();
    });
});

describe('replaceBlock', () => {
    it('keeps everything a person wrote around the block', () => {
        const body = bodyFor([AKIRA_MARK], 'Taking akira-mark this week.');
        const updated = replaceBlock(
            body,
            renderBlock([LOGIN_FORM], RUN_URL),
        ) as string;

        expect(updated).toContain('Taking akira-mark this week.');
        expect(updated).toContain('footer');
        expect(updated).toContain('- `blocks/login-form`');
        expect(updated).not.toContain('- `components/akira-mark`');
    });

    it('collapses a body carrying the block twice', () => {
        const body = `${bodyFor([AKIRA_MARK])}\n${bodyFor([AKIRA_MARK])}`;
        const updated = replaceBlock(
            body,
            renderBlock([LOGIN_FORM], RUN_URL),
        ) as string;

        expect(updated.match(new RegExp(MARKER_START, 'g'))).toHaveLength(1);
    });

    it('leaves an opening marker that never closes as the text it is', () => {
        const body = [
            bodyFor([AKIRA_MARK]),
            `Do not write between ${MARKER_START}`,
            'and the end marker. -- kid',
        ].join('\n');
        const updated = replaceBlock(
            body,
            renderBlock([LOGIN_FORM], RUN_URL),
        ) as string;

        expect(updated).toContain('and the end marker. -- kid');
    });

    it('reports no block to replace when the body has none', () => {
        expect(replaceBlock('nothing here', 'block')).toBeNull();
    });
});

describe('reportMissingExamples', () => {
    it('does nothing when nothing is missing and no issue is open', () => {
        const run = report([]);

        expect(run.verbs).toEqual(['issue list']);
    });

    it('comments and closes the open issue once nothing is missing', () => {
        const run = report([], { open: [{ number: 7, title: TITLE }] });

        expect(run.verbs).toEqual([
            'issue list',
            'issue comment',
            'issue close',
        ]);
    });

    it('opens an issue that is labelled and assigned', () => {
        const run = report([AKIRA_MARK]);

        expect(run.verbs).toEqual(['issue list', 'issue create']);
        expect(run.calls[1]).toContain('--label');
        expect(run.calls[1]).toContain('documentation');
        expect(run.calls[1]).toContain('--assignee');
        expect(run.calls[1]).toContain('kidiatoliny');
    });

    it('ignores an open issue whose title is not the one it owns', () => {
        const run = report([AKIRA_MARK], {
            open: [{ number: 3, title: 'Something else entirely' }],
        });

        expect(run.verbs).toEqual(['issue list', 'issue create']);
    });

    it('stays silent when the recorded list matches', () => {
        const run = report([AKIRA_MARK], {
            open: [{ number: 7, title: TITLE }],
            body: renderBody([AKIRA_MARK], RUN_URL),
        });

        expect(run.verbs).toEqual(['issue list', 'issue view']);
        expect(run.outcome).toContain('has not changed');
    });

    it('stays silent when only the order of the entries differs', () => {
        const run = report([LOGIN_FORM, AKIRA_MARK], {
            open: [{ number: 7, title: TITLE }],
            body: renderBody([AKIRA_MARK, LOGIN_FORM], RUN_URL),
        });

        expect(run.verbs).toEqual(['issue list', 'issue view']);
    });

    it('edits and comments when the list actually changed', () => {
        const run = report([AKIRA_MARK, LOGIN_FORM], {
            open: [{ number: 7, title: TITLE }],
            body: renderBody([AKIRA_MARK], RUN_URL),
        });

        expect(run.verbs).toEqual([
            'issue list',
            'issue view',
            'issue edit',
            'issue comment',
        ]);
        expect(run.calls[3].at(-1)).toContain('The list changed:');
    });

    it('rebuilds a body whose block was destroyed', () => {
        const run = report([AKIRA_MARK], {
            open: [{ number: 7, title: TITLE }],
            body: 'someone replaced the whole thing',
        });

        expect(run.calls[2].at(-1)).toContain(MARKER_START);
        expect(run.calls[2].at(-1)).toContain(MARKER_END);
    });
});
