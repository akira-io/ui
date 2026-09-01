const VERSION_PATTERN =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+)(?:\.[0-9A-Za-z-]+)*)?$/;

export function resolveDistTag(version, currentLatest = '') {
    const match = VERSION_PATTERN.exec(version);
    if (!match) {
        throw new Error(`${version} is not a valid semantic version`);
    }

    if (match[4]) {
        return match[4];
    }

    const trimmedLatest = currentLatest.trim();
    if (trimmedLatest === '') {
        return 'latest';
    }

    const latestMatch = VERSION_PATTERN.exec(trimmedLatest);
    if (!latestMatch) {
        throw new Error(
            `${trimmedLatest} is not a valid semantic version for the published latest`,
        );
    }

    const major = Number(match[1]);
    if (major >= Number(latestMatch[1])) {
        return 'latest';
    }

    return `v${major}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    process.stdout.write(
        resolveDistTag(process.argv[2] ?? '', process.argv[3] ?? ''),
    );
}
