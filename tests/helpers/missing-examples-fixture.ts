import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

export type MissingExamplesFixture = {
    uiRoot: string;
    siteRoot: string;
    remove: () => void;
    write: (relativePath: string, contents: string) => void;
    makeDir: (relativePath: string) => void;
    writeDemo: (relativePath: string, contents: string) => void;
    writeBaseline: (groups: Record<string, unknown>) => void;
};

export function makeFixture(): MissingExamplesFixture {
    const uiRoot = mkdtempSync(join(tmpdir(), 'akira-ui-'));
    const siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));

    const write = (relativePath: string, contents: string) => {
        const path = join(uiRoot, relativePath);

        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, contents);
    };

    const makeDir = (relativePath: string) =>
        mkdirSync(join(siteRoot, relativePath), { recursive: true });

    const writeDemo = (relativePath: string, contents: string) => {
        const path = join(siteRoot, 'src/demos', relativePath);

        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, contents);
    };

    write(
        'tsconfig.json',
        JSON.stringify({
            compilerOptions: {
                module: 'ESNext',
                moduleResolution: 'Bundler',
                jsx: 'react-jsx',
                baseUrl: '.',
                paths: { '@/*': ['./src/*'] },
            },
        }),
    );

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
    write('src/charts.ts', '');
    write('src/data-table.ts', '');
    write('src/form.ts', '');
    write('src/blocks.ts', '');
    write('src/shells.ts', '');

    writeDemo(
        'components/button/basic.tsx',
        "import { Button } from '@akira-io/ui';\n\nexport const Demo = () => <Button />;\n",
    );

    return {
        uiRoot,
        siteRoot,
        write,
        makeDir,
        writeDemo,
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
    };
}
