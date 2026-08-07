declare module 'shiki' {
    export function codeToHtml(
        code: string,
        options: {
            lang: string;
            themes: { light: string; dark: string };
            defaultColor?: false;
        },
    ): Promise<string>;
}
