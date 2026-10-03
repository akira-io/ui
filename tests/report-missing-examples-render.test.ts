import { describe, expect, it } from 'vitest';
import {
    groupByModule,
    normalize,
    renderList,
} from '../scripts/report-missing-examples.mjs';

const AKIRA_MARK = {
    group: 'components',
    slug: 'akira-mark',
    symbol: 'AkiraMark',
    specifier: '@akira-io/ui',
};
const LOGIN_FORM = {
    group: 'blocks',
    slug: 'login-form',
    symbol: 'LoginForm',
    specifier: '@akira-io/ui/blocks',
};
const LOGIN_FORM_EMAIL = { ...LOGIN_FORM, symbol: 'LoginFormEmail' };
const USE_UI_LOCALE = {
    group: 'locales',
    slug: 'context',
    symbol: 'useUiLocale',
    specifier: '@akira-io/ui',
};
const USE_UI_LABELS = {
    ...USE_UI_LOCALE,
    symbol: 'useUiLabels',
    specifier: '@akira-io/ui/blocks',
};

describe('normalize', () => {
    it('orders the symbols inside a module', () => {
        expect(normalize([LOGIN_FORM_EMAIL, LOGIN_FORM])).toEqual([
            LOGIN_FORM,
            LOGIN_FORM_EMAIL,
        ]);
    });
});

describe('groupByModule', () => {
    it('gathers the symbols of one module under it, in order', () => {
        expect(
            groupByModule([LOGIN_FORM_EMAIL, AKIRA_MARK, LOGIN_FORM]),
        ).toEqual([
            {
                module: 'blocks/login-form',
                specifiers: ['@akira-io/ui/blocks'],
                symbols: ['LoginForm', 'LoginFormEmail'],
            },
            {
                module: 'components/akira-mark',
                specifiers: ['@akira-io/ui'],
                symbols: ['AkiraMark'],
            },
        ]);
    });

    it('keeps every entry point a module is published from', () => {
        expect(groupByModule([USE_UI_LOCALE, USE_UI_LABELS])).toEqual([
            {
                module: 'locales/context',
                specifiers: ['@akira-io/ui/blocks', '@akira-io/ui'],
                symbols: ['useUiLabels', 'useUiLocale'],
            },
        ]);
    });
});

describe('renderList', () => {
    it('lists the missing symbols under their module', () => {
        expect(renderList([LOGIN_FORM_EMAIL, AKIRA_MARK, LOGIN_FORM])).toBe(
            [
                '- `blocks/login-form` from `@akira-io/ui/blocks`',
                '  - `LoginForm`',
                '  - `LoginFormEmail`',
                '- `components/akira-mark` from `@akira-io/ui`',
                '  - `AkiraMark`',
            ].join('\n'),
        );
    });
});
