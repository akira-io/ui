import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export type MissingExamplesFixture = {
    uiRoot: string;
    siteRoot: string;
    remove: () => void;
    write: (relativePath: string, contents: string) => void;
    makeDir: (relativePath: string) => void;
    writeBaseline: (groups: Record<string, string[]>) => void;
    addCodeFamily: () => void;
    addToastFamily: () => void;
};

export function makeFixture(): MissingExamplesFixture {
    const uiRoot = mkdtempSync(join(tmpdir(), 'akira-ui-'));
    const siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));

    const write = (relativePath: string, contents: string) =>
        writeFileSync(join(uiRoot, relativePath), contents);

    const makeDir = (relativePath: string) =>
        mkdirSync(join(siteRoot, relativePath), { recursive: true });

    for (const dir of ['src/components/ui', 'src/blocks', 'src/shells']) {
        mkdirSync(join(uiRoot, dir), { recursive: true });
    }

    write(
        'src/components/ui/button.tsx',
        'export const Button = () => null;\n',
    );
    write(
        'src/components/ui/akira-mark.tsx',
        'export const AkiraMark = () => null;\n',
    );
    write(
        'src/components/ui/cartesian-chart.tsx',
        'export type ChartCurve = "linear";\n',
    );
    write(
        'src/components/ui/field-context.ts',
        'export const useField = () => null;\n',
    );
    mkdirSync(join(uiRoot, 'src/components/ui/editor'), { recursive: true });
    write(
        'src/components/ui/editor/rich-text-editor.tsx',
        'export const RichTextEditor = () => null;\n',
    );
    write(
        'src/index.ts',
        [
            "export * from '@/components/ui/button';",
            "export * from '@/components/ui/akira-mark';",
            "export type { ChartCurve } from '@/components/ui/cartesian-chart';",
            "export { useField } from '@/components/ui/field-context';",
        ].join('\n'),
    );
    write(
        'src/editor.ts',
        "export { RichTextEditor } from '@/components/ui/editor/rich-text-editor';\n",
    );
    write('src/code.ts', '');
    write('src/blocks.ts', '');
    write('src/shells.ts', '');

    makeDir('src/demos/components/button');

    return {
        uiRoot,
        siteRoot,
        write,
        makeDir,
        remove: () => {
            rmSync(uiRoot, { recursive: true, force: true });
            rmSync(siteRoot, { recursive: true, force: true });
        },
        writeBaseline: (groups) => {
            makeDir('tests');
            writeFileSync(
                join(siteRoot, 'tests/uncovered-entries.json'),
                JSON.stringify(groups),
            );
        },
        addCodeFamily: () => {
            write(
                'src/components/ui/code.tsx',
                'export const Code = () => null;\n',
            );
            write(
                'src/components/ui/code-block.tsx',
                'export const CodeBlock = () => null;\n',
            );
            write(
                'src/code.ts',
                [
                    "export { Code } from '@/components/ui/code';",
                    "export { CodeBlock } from '@/components/ui/code-block';",
                ].join('\n'),
            );
        },
        addToastFamily: () => {
            write(
                'src/components/ui/sonner.tsx',
                'export const Toaster = () => null;\n',
            );
            write(
                'src/components/ui/toast.tsx',
                'export const toast = () => null;\n',
            );
            write(
                'src/index.ts',
                [
                    "export * from '@/components/ui/sonner';",
                    "export * from '@/components/ui/toast';",
                ].join('\n'),
            );
        },
    };
}
