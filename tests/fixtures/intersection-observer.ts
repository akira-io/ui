interface ObservedTarget {
    target: Element;
    callback: IntersectionObserverCallback;
    observer: IntersectionObserver;
}

let observedTargets: ObservedTarget[] = [];

class ControllableIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [0];

    private callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element): void {
        observedTargets.push({
            target,
            callback: this.callback,
            observer: this,
        });
        this.callback(
            [{ target, isIntersecting: true } as IntersectionObserverEntry],
            this,
        );
    }

    unobserve(target: Element): void {
        observedTargets = observedTargets.filter(
            (entry) => entry.target !== target,
        );
    }

    disconnect(): void {
        observedTargets = observedTargets.filter(
            (entry) => entry.observer !== this,
        );
    }

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}

export function installIntersectionObserver(): void {
    observedTargets = [];
    globalThis.IntersectionObserver =
        ControllableIntersectionObserver as unknown as typeof IntersectionObserver;
}

export function setIntersecting(
    target: Element,
    isIntersecting: boolean,
): void {
    const entry = observedTargets.find((item) => item.target === target);

    if (!entry) {
        throw new Error('the target is not observed');
    }

    entry.callback(
        [{ target, isIntersecting } as IntersectionObserverEntry],
        entry.observer,
    );
}
