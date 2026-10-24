import { useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export interface PlayedAnimation {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
}

export const played: PlayedAnimation[] = [];

let finishLast: (() => void) | null = null;
let setDialogOpen: (open: boolean) => void = () => undefined;

const originalAnimate = HTMLElement.prototype.animate;
const originalMatchMedia = window.matchMedia;

function mediaQuery(reduced: boolean) {
    return (query: string) =>
        ({
            matches: reduced && query.includes('prefers-reduced-motion'),
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => false,
        }) as MediaQueryList;
}

export function installCompositor(reduced: boolean): void {
    window.matchMedia = mediaQuery(reduced);
    HTMLElement.prototype.animate = function animate(
        this: HTMLElement,
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
        options?: number | KeyframeAnimationOptions,
    ) {
        const element = this;

        played.push({
            keyframes: (keyframes ?? []) as Keyframe[],
            options: typeof options === 'object' ? options : {},
        });

        return {
            cancel() {},
            commitStyles() {
                element.style.transform = 'translate(1px, 2px) scale(0.5)';
                element.style.opacity = '0.4';
            },
            set onfinish(callback: (() => void) | null) {
                finishLast = callback;
            },
        } as unknown as Animation;
    };
}

export function restoreCompositor(): void {
    HTMLElement.prototype.animate = originalAnimate;
    window.matchMedia = originalMatchMedia;
}

export function resetCompositor(): void {
    played.length = 0;
    finishLast = null;
}

export function finishLastAnimation(): void {
    finishLast?.();
}

export function openDialog(open: boolean): void {
    setDialogOpen(open);
}

export function ControlledDialog() {
    const [open, setOpen] = useState(true);

    setDialogOpen = setOpen;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle>Archive project</DialogTitle>
            </DialogContent>
        </Dialog>
    );
}

export const dialogContent = () =>
    document.querySelector<HTMLElement>('[data-slot="dialog-content"]');
