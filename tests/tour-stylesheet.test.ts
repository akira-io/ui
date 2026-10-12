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

function ruleOf(css: string, selector: string): string {
    const start = css.indexOf(`${selector} {`);

    if (start === -1) {
        throw new Error(`tour.css has no rule for ${selector}`);
    }

    return css.slice(start, css.indexOf('}', start));
}

it('floats the tour on the same glass as every other popover', () => {
    const popover = ruleOf(
        readStylesheet('tour.css'),
        '.driver-popover.akira-tour',
    );

    expect(popover).toMatch(/background-color:\s*var\(--glass-button-tint\)/);
    expect(popover).toMatch(/backdrop-filter:\s*blur\(40px\) saturate\(1\.5\)/);
    expect(popover).toMatch(/var\(--glass-edge-light\)/);
});

it('draws the tour buttons as the library buttons: glass capsules at the control height', () => {
    const css = readStylesheet('tour.css');
    const shared = ruleOf(
        css,
        '.driver-popover.akira-tour .driver-popover-navigation-btns button,\n.driver-popover.akira-tour .driver-popover-close-btn',
    );
    const buttons = ruleOf(
        css,
        '.driver-popover.akira-tour .driver-popover-navigation-btns button',
    );

    expect(shared).toMatch(/background-color:\s*var\(--glass-button-tint\)/);
    expect(shared).toMatch(/border-radius:\s*9999px/);
    expect(buttons).toMatch(/height:\s*var\(--control-h\)/);
    expect(buttons).toMatch(/padding:\s*0 var\(--space-inset\)/);
    expect(
        ruleOf(css, '.driver-popover.akira-tour .driver-popover-next-btn'),
    ).toMatch(/var\(--primary\) 85%/);
});

it('drops the arrow, as glass popovers have none', () => {
    expect(
        ruleOf(
            readStylesheet('tour.css'),
            '.driver-popover.akira-tour .driver-popover-arrow',
        ),
    ).toMatch(/display:\s*none/);
});
