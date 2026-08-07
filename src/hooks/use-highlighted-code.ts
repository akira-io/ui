import * as React from 'react';

import { highlightCode } from '@/lib/shiki';

export function useHighlightedCode(
    code: string,
    language: string | undefined,
    html: string | undefined,
): string | null {
    const [highlighted, setHighlighted] = React.useState<string | null>(
        html ?? null,
    );

    React.useEffect(() => {
        if (html !== undefined) {
            setHighlighted(html);

            return;
        }

        if (language === undefined) {
            setHighlighted(null);

            return;
        }

        let active = true;

        highlightCode(code, language).then((result) => {
            if (active) {
                setHighlighted(result);
            }
        });

        return () => {
            active = false;
        };
    }, [code, language, html]);

    return highlighted;
}
