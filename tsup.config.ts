import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        code: 'src/code.ts',
        blocks: 'src/blocks.ts',
        editor: 'src/editor.ts',
        shells: 'src/shells.ts',
        inertia: 'src/inertia.ts',
        'locales/pt': 'src/locales/pt.ts',
    },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    // tsup's Rollup-based tree-shaking pass strips the injected "use client" directive; esbuild already tree-shakes.
    treeshake: false,
    metafile: true,
    esbuildPlugins: [
        preserveDirectivesPlugin({
            directives: ['use client'],
            include: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
        }),
    ],
    external: [
        'react',
        'react-dom',
        '@inertiajs/react',
        'react-hook-form',
        'recharts',
        '@tanstack/react-table',
        'shiki',
        '@tiptap/core',
        '@tiptap/pm',
        '@tiptap/react',
        '@tiptap/starter-kit',
    ],
});
