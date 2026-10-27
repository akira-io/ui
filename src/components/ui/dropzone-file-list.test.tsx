// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DropzoneFileList } from '@/components/ui/dropzone-file-list';
import { dropzoneDefaultLabels } from '@/components/ui/dropzone-labels';

afterEach(cleanup);

describe('the dropzone file rows', () => {
    it('tint whatever surface holds them instead of matching its fill', () => {
        render(
            <DropzoneFileList
                files={[new File(['a'], 'ticket.pdf')]}
                labels={dropzoneDefaultLabels}
                disabled={false}
                onRemove={() => undefined}
            />,
        );

        const row = document
            .querySelector('[data-slot="dropzone-file"]')!
            .className.split(' ');

        expect(row).toContain('bg-(--glass-highlight)');
        expect(row).not.toContain('bg-(--grouped-fill)');
        expect(row).not.toContain('bg-muted');
    });
});
