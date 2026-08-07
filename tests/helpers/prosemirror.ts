const emptyRect: DOMRect = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    toJSON: () => ({}),
};

const emptyRectList = Object.assign([], {
    item: () => null,
}) as unknown as DOMRectList;

export function supportProseMirrorLayout(): void {
    Range.prototype.getClientRects = () => emptyRectList;
    Range.prototype.getBoundingClientRect = () => emptyRect;
    Element.prototype.getClientRects = () => emptyRectList;
    Element.prototype.getBoundingClientRect = () => emptyRect;
    Element.prototype.scrollIntoView = () => undefined;
    document.elementFromPoint = () => null;
}
