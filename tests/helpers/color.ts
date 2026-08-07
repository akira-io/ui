export type Oklch = { l: number; c: number; h: number };

export function parseOklch(value: string): Oklch {
    const match = value
        .trim()
        .match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);

    if (!match) {
        throw new Error(`not an oklch value: ${value}`);
    }

    return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
}

function toLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
    const radians = (h * Math.PI) / 180;
    const a = c * Math.cos(radians);
    const b = c * Math.sin(radians);

    const long = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const medium = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const short = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

    return [
        4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short,
        -1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short,
        -0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short,
    ];
}

function encode(channel: number): number {
    const sign = channel < 0 ? -1 : 1;
    const magnitude = Math.abs(channel);

    return magnitude <= 0.0031308
        ? sign * 12.92 * magnitude
        : sign * (1.055 * magnitude ** (1 / 2.4) - 0.055);
}

export function oklchToSrgb(color: Oklch): [number, number, number] {
    const linear = toLinearSrgb(color);

    return [encode(linear[0]), encode(linear[1]), encode(linear[2])];
}

export function isInGamut(rgb: [number, number, number]): boolean {
    return rgb.every((channel) => channel >= -0.0005 && channel <= 1.0005);
}

export function toHex(color: Oklch): string {
    const channels = oklchToSrgb(color).map((channel) =>
        Math.round(Math.min(1, Math.max(0, channel)) * 255)
            .toString(16)
            .padStart(2, '0'),
    );

    return `#${channels.join('')}`;
}

function relativeLuminance(color: Oklch): number {
    const [r, g, b] = toLinearSrgb(color).map((channel) =>
        Math.min(1, Math.max(0, channel)),
    );

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function decode(channel: number): number {
    const magnitude = Math.min(1, Math.max(0, channel));

    return magnitude <= 0.04045
        ? magnitude / 12.92
        : ((magnitude + 0.055) / 1.055) ** 2.4;
}

function luminanceOf(rgb: number[]): number {
    const [r, g, b] = rgb.map(decode);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function tintContrast(
    text: Oklch,
    tint: Oklch,
    backdrop: Oklch,
    alpha: number,
): number {
    const source = oklchToSrgb(tint);
    const base = oklchToSrgb(backdrop);
    const composite = source.map(
        (channel, index) => alpha * channel + (1 - alpha) * base[index],
    );
    const [lighter, darker] = [
        luminanceOf(oklchToSrgb(text)),
        luminanceOf(composite),
    ].sort((first, second) => second - first);

    return (lighter + 0.05) / (darker + 0.05);
}

export function contrastRatio(a: Oklch, b: Oklch): number {
    const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
        (first, second) => second - first,
    );

    return (lighter + 0.05) / (darker + 0.05);
}
