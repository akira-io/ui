import { expect, it } from 'vitest';
import { readStylesheet } from './helpers/css';

it('ships the tour popover styles through the theme', () => {
    expect(readStylesheet('theme.css')).toContain("@import './tour.css';");
    expect(readStylesheet('tour.css')).toContain(
        '.driver-popover.akira-tour {',
    );
});

it('lists the tour stylesheet among the published files', async () => {
    const manifest = (await import('../package.json')).default;

    expect(manifest.files).toContain('tour.css');
});
