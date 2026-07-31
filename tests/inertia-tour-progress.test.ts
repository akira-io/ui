import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { TourProgress } from '@/blocks/tour';
import { recordTourProgress } from '@/inertia-tour-progress';

type FetchArgs = [input: RequestInfo | URL, init: RequestInit | undefined];

const progress: TourProgress = {
    tour: 'dashboard',
    version: 3,
    lastStep: 2,
    outcome: 'completed',
};

let calls: FetchArgs[];
let originalFetch: typeof globalThis.fetch;
let originalDocument: Document;

function setCookie(cookie: string): void {
    globalThis.document = { cookie } as Document;
}

beforeEach(() => {
    originalFetch = globalThis.fetch;
    originalDocument = globalThis.document;
    calls = [];
    globalThis.fetch = ((...args: FetchArgs) => {
        calls.push(args);
        return Promise.resolve(new Response(null, { status: 204 }));
    }) as typeof fetch;
    setCookie('');
});

afterEach(() => {
    globalThis.fetch = originalFetch;
    globalThis.document = originalDocument;
});

describe('recordTourProgress', () => {
    it('posts to the given url with POST, keepalive and same-origin credentials', () => {
        recordTourProgress('/tours/progress', progress);

        const [url, init] = calls[0];
        expect(url).toBe('/tours/progress');
        expect(init).toMatchObject({
            method: 'POST',
            keepalive: true,
            credentials: 'same-origin',
        });
    });

    it('sends the url-decoded XSRF token from the cookie', () => {
        setCookie('locale=en; XSRF-TOKEN=abc%2Fdef');

        recordTourProgress('/tours/progress', progress);

        const [, init] = calls[0];
        const headers = init?.headers as Record<string, string>;
        expect(headers['X-XSRF-TOKEN']).toBe('abc/def');
    });

    it('sends an empty XSRF token when no such cookie is present', () => {
        setCookie('locale=en');

        recordTourProgress('/tours/progress', progress);

        const [, init] = calls[0];
        const headers = init?.headers as Record<string, string>;
        expect(headers['X-XSRF-TOKEN']).toBe('');
    });

    it('maps the progress object into the snake_case request body', () => {
        recordTourProgress('/tours/progress', progress);

        const [, init] = calls[0];
        const body: unknown = JSON.parse(init?.body as string);
        expect(body).toEqual({
            version: 3,
            last_step: 2,
            outcome: 'completed',
        });
    });
});
