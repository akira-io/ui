import { describe, expect, it } from 'vitest';
import { sanitizeDiscordNotes } from '../scripts/release-discord-notes.mjs';

const ZERO_WIDTH_SPACE = '\u200b';

describe('sanitizeDiscordNotes', () => {
    it('keeps the text of a markdown link and drops its target', () => {
        expect(
            sanitizeDiscordNotes(
                '- **blocks:** Fix the dialog ([a1b2c3d](https://github.com/akira-io/ui/commit/a1b2c3d))',
            ),
        ).toBe('- **blocks:** Fix the dialog (a1b2c3d)');
    });

    it('drops the target of a link a commit message smuggled in', () => {
        expect(
            sanitizeDiscordNotes('- Fix [the docs](https://evil.example/x)'),
        ).toBe('- Fix the docs');
    });

    it('drops the target of every link, one per changelog line', () => {
        expect(
            sanitizeDiscordNotes(
                '- One ([a1](https://e/1))\n- Two ([b2](https://e/2)) [c](https://e/3)',
            ),
        ).toBe('- One (a1)\n- Two (b2) c');
    });

    it('drops the targets of links nested inside the text of another link', () => {
        expect(sanitizeDiscordNotes('[a [b](x)](https://evil.example)')).toBe(
            'a b',
        );
        expect(sanitizeDiscordNotes('[[ok](x)](https://evil.example)')).toBe(
            'ok',
        );
    });

    it('keeps the alt text of a markdown image and drops its source', () => {
        expect(
            sanitizeDiscordNotes('![tracking](https://evil.example/p.png)'),
        ).toBe('tracking');
    });

    it('stops @everyone and @here from pinging the channel', () => {
        expect(sanitizeDiscordNotes('- ping @everyone and @here')).toBe(
            `- ping @${ZERO_WIDTH_SPACE}everyone and @${ZERO_WIDTH_SPACE}here`,
        );
    });

    it('stops user, role and channel mentions from resolving', () => {
        expect(sanitizeDiscordNotes('<@123> <@!456> <@&789> <#101>')).toBe(
            [
                `<@${ZERO_WIDTH_SPACE}123>`,
                `<@!${ZERO_WIDTH_SPACE}456>`,
                `<@&${ZERO_WIDTH_SPACE}789>`,
                `<#${ZERO_WIDTH_SPACE}101>`,
            ].join(' '),
        );
    });

    it('leaves everything else byte for byte, trailing newline included', () => {
        const notes =
            '### Bug Fixes\n\n- close the "$(touch pwned)" dialog\n- keep `code` [as] (is)\n';

        expect(sanitizeDiscordNotes(notes)).toBe(notes);
    });
});
