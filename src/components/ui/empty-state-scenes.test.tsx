// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { Inbox } from 'lucide-react';
import { afterEach, describe, expect, it } from 'vitest';

import { EmptyState, type EmptyStateScene } from '@/components/ui/empty-state';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

afterEach(cleanup);

const scenes: [EmptyStateScene, string, string][] = [
    ['no-results', 'lucide-search-x', 'No results'],
    ['empty', 'lucide-inbox', 'Nothing here yet'],
    ['offline', 'lucide-cloud-off', "You're offline"],
    ['error', 'lucide-triangle-alert', 'Something went wrong'],
    ['caught-up', 'lucide-circle-check', "You're all caught up"],
    ['not-found', 'lucide-file-question-mark', 'Not found'],
];

const icon = () => document.querySelector('[data-slot="empty-state-icon"] svg');

describe('an empty state scene', () => {
    it.each(scenes)(
        '%s shows its icon and its title',
        (scene, iconClass, title) => {
            render(<EmptyState scene={scene} />);

            expect(icon()?.classList.contains(iconClass)).toBe(true);
            expect(screen.getByText(title)).toBeTruthy();
        },
    );

    it('lets the icon and the title passed in win over the scene', () => {
        render(<EmptyState scene="offline" icon={Inbox} title="Queued" />);

        expect(icon()?.classList.contains('lucide-inbox')).toBe(true);
        expect(screen.getByText('Queued')).toBeTruthy();
    });

    it('keeps the search icon and the plain title without a scene', () => {
        render(<EmptyState />);

        expect(icon()?.classList.contains('lucide-search-x')).toBe(true);
        expect(screen.getByText('Nothing to show')).toBeTruthy();
    });

    it('takes the scene title from the locale', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <EmptyState scene="caught-up" />
            </UiLocaleProvider>,
        );

        expect(screen.getByText('Está tudo em dia')).toBeTruthy();
    });

    it('keeps the compact icon size', () => {
        render(<EmptyState scene="empty" compact />);

        expect(icon()?.getAttribute('class')).toContain('size-4');
    });
});
