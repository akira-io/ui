// @vitest-environment jsdom

import { cleanup, render, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    ControlledDialog,
    installCompositor,
    played,
    resetCompositor,
    restoreCompositor,
} from '../../../tests/fixtures/compositor';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(() => {
    patchPointerApis();
    installCompositor(true);
});

afterAll(restoreCompositor);

afterEach(() => {
    cleanup();
    resetCompositor();
});

describe('a dialog on the compositor under reduced motion', () => {
    it('fades in the short reduced timing', async () => {
        render(<ControlledDialog />);

        await waitFor(() => expect(played.length).toBe(1));
        expect(played[0]!.options).toMatchObject({
            duration: 120,
            easing: 'ease-out',
        });
    });
});
