import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        blocks: 'src/blocks.ts',
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
    ],
    // TODO: add esbuild-plugin-preserve-directives for Next.js RSC ("use client") when a Next app consumes this.
});
