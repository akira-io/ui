// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    ControlledDialog,
    dialogContent,
    finishLastAnimation,
    installCompositor,
    openDialog,
    played,
    resetCompositor,
    restoreCompositor,
} from '../../../tests/fixtures/compositor';
import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(() => {
    patchPointerApis();
    installCompositor(false);
});

afterAll(restoreCompositor);

afterEach(() => {
    cleanup();
    resetCompositor();
});

describe('a dialog on the compositor', () => {
    it('opens in 260ms and closes in 180ms, unmounting only when the close finishes', async () => {
        render(<ControlledDialog />);

        await waitFor(() => expect(played.length).toBe(1));
        expect(played[0]!.options).toMatchObject({
            duration: 260,
            fill: 'backwards',
        });

        act(() => openDialog(false));
        await waitFor(() => expect(played.length).toBe(2));
        expect(played[1]!.options).toMatchObject({
            duration: 180,
            fill: 'forwards',
        });
        expect(dialogContent()).not.toBeNull();

        act(() => finishLastAnimation());
        await waitFor(() => expect(dialogContent()).toBeNull());
    });

    it('closes from where the opening left it instead of snapping to rest', async () => {
        render(<ControlledDialog />);
        await waitFor(() => expect(played.length).toBe(1));

        act(() => openDialog(false));
        await waitFor(() => expect(played.length).toBe(2));

        expect(played[1]!.keyframes[0]).toMatchObject({
            transform: 'translate(1px, 2px) scale(0.5)',
            opacity: '0.4',
        });
    });

    it('reopens from where the close left it instead of snapping', async () => {
        render(<ControlledDialog />);
        await waitFor(() => expect(played.length).toBe(1));

        act(() => openDialog(false));
        await waitFor(() => expect(played.length).toBe(2));
        act(() => openDialog(true));
        await waitFor(() => expect(played.length).toBe(3));

        expect(played[2]!.keyframes[0]).toMatchObject({
            transform: 'translate(1px, 2px) scale(0.5)',
            opacity: '0.4',
        });
    });
});
