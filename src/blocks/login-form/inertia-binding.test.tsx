/** @vitest-environment jsdom */

import { router } from '@inertiajs/react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
}

beforeAll(() => {
    globalThis.ResizeObserver ??=
        ResizeObserverStub as unknown as typeof ResizeObserver;
});

afterEach(cleanup);

describe('the Inertia login binding', () => {
    it('is exported from the Inertia entry only', async () => {
        const inertia = await import('@/inertia');
        const blocks = await import('@/blocks');

        expect(inertia).toHaveProperty('InertiaLoginForm');
        expect(blocks).not.toHaveProperty('InertiaLoginForm');
    });

    it('renders the email field, the password field and the submit button', async () => {
        const { InertiaLoginForm } = await import('@/inertia');

        render(<InertiaLoginForm action="/login" />);

        expect(screen.getByLabelText('Email address')).not.toBeNull();
        expect(screen.getByLabelText('Password')).not.toBeNull();
        expect(screen.getByRole('button', { name: 'Log in' })).not.toBeNull();
    });

    it('points the form element at the given action', async () => {
        const { InertiaLoginForm } = await import('@/inertia');

        const { container } = render(<InertiaLoginForm action="/login" />);
        const form = container.querySelector('form');

        expect(form?.getAttribute('action')).toBe('/login');
    });

    it('renders the forgot password link with Inertia Link, not the plain anchor fallback', async () => {
        const { InertiaLoginForm } = await import('@/inertia');
        const visit = vi.spyOn(router, 'visit').mockImplementation(() => {});

        render(
            <InertiaLoginForm action="/login" forgotPasswordHref="/forgot" />,
        );

        const link = screen.getByRole('link', {
            name: 'Forgot your password?',
        });
        fireEvent.click(link, { button: 0 });

        expect(visit).toHaveBeenCalledWith('/forgot', expect.anything());

        visit.mockRestore();
    });

    it('passes Inertia Form errors through to the rendered field', async () => {
        const { InertiaLoginForm } = await import('@/inertia');
        const post = vi
            .spyOn(router, 'post')
            .mockImplementation((_url, _data, options) => {
                options?.onStart?.({} as never);
                options?.onError?.({
                    email: 'These credentials do not match our records.',
                });
                options?.onFinish?.({} as never);
            });

        const { container } = render(<InertiaLoginForm action="/login" />);
        const form = container.querySelector('form');

        fireEvent.submit(form!);

        const email = screen.getByLabelText('Email address');

        expect(email.getAttribute('aria-invalid')).toBe('true');
        expect(
            screen.getByText('These credentials do not match our records.'),
        ).not.toBeNull();

        post.mockRestore();
    });

    it('passes Inertia Form processing state through to the submit button', async () => {
        const { InertiaLoginForm } = await import('@/inertia');
        const post = vi
            .spyOn(router, 'post')
            .mockImplementation((_url, _data, options) => {
                options?.onStart?.({} as never);
            });

        const { container } = render(<InertiaLoginForm action="/login" />);
        const form = container.querySelector('form');

        fireEvent.submit(form!);

        const button = screen.getByRole('button', { name: 'Signing in' });

        expect(button.hasAttribute('disabled')).toBe(true);
        expect(button.getAttribute('aria-busy')).toBe('true');

        post.mockRestore();
    });
});
