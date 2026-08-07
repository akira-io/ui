const LIGHT_THEME = 'github-light';

const DARK_THEME = 'github-dark';

type CodeToHtml = typeof import('shiki').codeToHtml;

let pending: Promise<CodeToHtml | null> | null = null;

function loadCodeToHtml(): Promise<CodeToHtml | null> {
    pending ??= import('shiki')
        .then((module) => module.codeToHtml)
        .catch(() => null);

    return pending;
}

export async function highlightCode(
    code: string,
    language: string,
): Promise<string | null> {
    const codeToHtml = await loadCodeToHtml();

    if (!codeToHtml) {
        return null;
    }

    try {
        return await codeToHtml(code, {
            lang: language,
            themes: { light: LIGHT_THEME, dark: DARK_THEME },
            defaultColor: false,
        });
    } catch {
        return null;
    }
}
