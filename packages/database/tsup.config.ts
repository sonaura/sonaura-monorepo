import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/client.ts',
    'src/server.ts',
    'src/middleware.ts',
    'src/required-env.ts',
    'src/types/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
});
