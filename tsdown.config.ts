import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  name: 'LocaleMatcher',
  dts: true,
  format: {
    esm: {
      target: ['es2015']
    },
    cjs: {
      target: ['node20']
    },
    iife: {
      target: ['es2015'],
      outputOptions: {
        name: 'LocaleMatcher'
      }
    }
  }
});
