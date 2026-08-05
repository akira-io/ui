const VERSION_PATTERN =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+)(?:\.[0-9A-Za-z-]+)*)?$/;

export function resolveDistTag(version, currentLatest = '') {
    const match = VERSION_PATTERN.exec(version);
    if (!match) {
        throw new Error(`${version} is not a valid semantic version`);
    }

    return match[4] ?? 'latest';
}

if (import.meta.url === `file://${process.argv[1]}`) {
    process.stdout.write(
        resolveDistTag(process.argv[2] ?? '', process.argv[3] ?? ''),
    );
}
