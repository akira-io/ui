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
    treeshake: true,
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
    // TODO: add esbuild-plugin-preserve-directives for Next.js RSC ("use client") when a Next app consumes this.
});
