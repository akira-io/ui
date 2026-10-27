// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import { patchPointerApis } from '../../../tests/fixtures/sheet-overlay';

beforeAll(patchPointerApis);

afterEach(cleanup);

describe('the tooltip bubble', () => {
    it('floats on glass without an opaque arrow under it', async () => {
        render(
            <TooltipProvider>
                <Tooltip open>
                    <TooltipTrigger>Help</TooltipTrigger>
                    <TooltipContent>Opens the guide</TooltipContent>
                </Tooltip>
            </TooltipProvider>,
        );

        await screen.findAllByText('Opens the guide');
        const content = document.querySelector(
            '[data-slot="tooltip-content"]',
        )!;

        expect(content.className.split(' ')).toContain('glass-panel');
        expect(document.querySelector('.fill-popover')).toBeNull();
        expect(content.querySelector('svg')).toBeNull();
    });
});
