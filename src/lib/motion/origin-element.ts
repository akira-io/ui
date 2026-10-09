const INTERACTIVE = 'button, a, [role="button"], [data-slot$="-trigger"]';
const RECENT_MS = 1000;

let lastPressed: { element: HTMLElement; at: number } | null = null;
let tracking = false;

export function trackOrigin(): void {
    if (tracking || typeof document === 'undefined') {
        return;
    }

    tracking = true;
    document.addEventListener(
        'pointerdown',
        (event) => {
            const element =
                event.target instanceof Element
                    ? event.target.closest<HTMLElement>(INTERACTIVE)
                    : null;

            lastPressed = element ? { element, at: performance.now() } : null;
        },
        true,
    );
}

export function takeOrigin(): HTMLElement | null {
    if (
        lastPressed &&
        lastPressed.element.isConnected &&
        performance.now() - lastPressed.at < RECENT_MS
    ) {
        return lastPressed.element;
    }

    const active = document.activeElement;

    return active instanceof HTMLElement && active !== document.body
        ? active
        : null;
}
