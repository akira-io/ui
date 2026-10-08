// @vitest-environment jsdom

import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';

import {
    SIDEBAR_COLLAPSED_GROUPS_KEY,
    SIDEBAR_EXPANDED_GROUPS_KEY,
    useCollapsedGroup,
} from '@/hooks/use-collapsed-groups';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

afterEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = '';
});

function Group({ defaultOpen }: { defaultOpen?: boolean }) {
    const { open } = useCollapsedGroup({ group: 'Reports', defaultOpen });

    return <span data-open={open}>{open ? 'open' : 'closed'}</span>;
}

describe('a collapsed group in server-rendered markup', () => {
    it('hydrates from defaultOpen, then applies the stored state', async () => {
        const html = renderToString(<Group />);
        window.localStorage.setItem(
            SIDEBAR_COLLAPSED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const recoverableErrors: unknown[] = [];

        await act(async () => {
            hydrateRoot(container, <Group />, {
                onRecoverableError: (error) => {
                    recoverableErrors.push(error);
                },
            });
        });

        expect(recoverableErrors).toEqual([]);
        expect(
            container.querySelector('[data-open]')?.getAttribute('data-open'),
        ).toBe('false');
    });

    it('hydrates a group that starts closed, then opens it as stored', async () => {
        const html = renderToString(<Group defaultOpen={false} />);
        window.localStorage.setItem(
            SIDEBAR_EXPANDED_GROUPS_KEY,
            JSON.stringify(['Reports']),
        );

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const recoverableErrors: unknown[] = [];

        await act(async () => {
            hydrateRoot(container, <Group defaultOpen={false} />, {
                onRecoverableError: (error) => {
                    recoverableErrors.push(error);
                },
            });
        });

        expect(recoverableErrors).toEqual([]);
        expect(container.textContent).toBe('open');
    });
});
