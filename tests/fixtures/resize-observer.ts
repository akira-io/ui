interface ObservedTarget {
    target: Element;
    callback: ResizeObserverCallback;
    observer: ResizeObserver;
}

let observedTargets: ObservedTarget[] = [];

class ControllableResizeObserver implements ResizeObserver {
    private callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element): void {
        observedTargets.push({
            target,
            callback: this.callback,
            observer: this,
        });
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
}

export function installResizeObserver(): void {
    observedTargets = [];
    globalThis.ResizeObserver =
        ControllableResizeObserver as unknown as typeof ResizeObserver;
}

export function resize(target: Element): void {
    const entry = observedTargets.find((item) => item.target === target);

    if (!entry) {
        throw new Error('the target is not observed');
    }

    entry.callback(
        [{ target } as unknown as ResizeObserverEntry],
        entry.observer,
    );
}
