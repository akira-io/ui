// src/components/ui/bar-stack-geometry.ts
function round(value) {
  return Math.round(value * 1e4) / 1e4;
}
function pixelSpan(from, to) {
  const start = Math.round(Math.min(from, to));
  return { start, size: Math.round(Math.max(from, to)) - start };
}
function sideValues(datum, keys, negative) {
  return keys.map((key) => ({ key, value: Number(datum?.[key]) })).filter(
    ({ value }) => Number.isFinite(value) && value < 0 === negative
  );
}
function stackSideTotal(datum, keys, negative) {
  return sideValues(datum, keys, negative).reduce(
    (sum, { value }) => sum + value,
    0
  );
}
function stackSideOwner(datum, keys, negative) {
  return sideValues(datum, keys, negative).find(({ value }) => value !== 0)?.key;
}
function stackPixelBox(segment, from, to, horizontal) {
  const along = pixelSpan(from, to);
  const across = horizontal ? pixelSpan(segment.y, segment.y + segment.height) : pixelSpan(segment.x, segment.x + segment.width);
  return horizontal ? {
    x: along.start,
    y: across.start,
    width: along.size,
    height: across.size
  } : {
    x: across.start,
    y: along.start,
    width: across.size,
    height: along.size
  };
}
function stackCornerRadius(box, radius, horizontal) {
  const thickness = horizontal ? box.height : box.width;
  const length = horizontal ? box.width : box.height;
  return round(Math.max(0, Math.min(radius, thickness / 6, length / 2)));
}

export {
  stackSideTotal,
  stackSideOwner,
  stackPixelBox,
  stackCornerRadius
};
//# sourceMappingURL=chunk-ZTUFU2VV.js.map