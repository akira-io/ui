export function waitForTargets(
    targets: string[],
    timeout: number,
    onSettled: () => void,
): () => void {
    const allPresent = (): boolean =>
        targets.every((target) => document.querySelector(target) !== null);

    let settled = false;
    let observer: MutationObserver | null = null;
    let timer: number | undefined;

    const stop = (): void => {
        settled = true;
        observer?.disconnect();
        window.clearTimeout(timer);
    };

    const settle = (): void => {
        if (settled) {
            return;
        }

        stop();
        onSettled();
    };

    if (allPresent()) {
        settle();

        return stop;
    }

    observer = new MutationObserver(() => {
        if (allPresent()) {
            settle();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
    });
    timer = window.setTimeout(settle, timeout);

    return stop;
}
