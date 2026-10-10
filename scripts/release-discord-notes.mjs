import { readFileSync } from 'node:fs';

const ZERO_WIDTH_SPACE = '\u200b';
const MARKDOWN_LINK = /!?\[([^\]\n]*)\]\([^)\n]*\)/g;
const BROADCAST_MENTION = /@(everyone|here)/g;
const ENTITY_MENTION = /<(@[!&]?|#)(\d+)>/g;

export function sanitizeDiscordNotes(notes) {
    return notes
        .replace(MARKDOWN_LINK, '$1')
        .replace(BROADCAST_MENTION, `@${ZERO_WIDTH_SPACE}$1`)
        .replace(ENTITY_MENTION, `<$1${ZERO_WIDTH_SPACE}$2>`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    process.stdout.write(sanitizeDiscordNotes(readFileSync(0, 'utf8')));
}
