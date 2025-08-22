import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'LocaleMatcher',
      fileName: (format) => `index.${format}.js`
    }
  },
  plugins: [typescript()]
});
