import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'witnet-radon-js', 
      fileName: (format) => `witnet-radon-js.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        globals: { },
      },
    },
  },
});