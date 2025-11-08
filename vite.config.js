/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [dts({
    include: ['src/**/*'],
    outDir: 'dist'
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SlateLit',
      fileName: format => `slate-lit.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['lit', 'slate', 'slate-history'],
      output: {
        globals: {
          lit: 'Lit',
          slate: 'Slate',
          'slate-history': 'SlateHistory'
        }
      }
    }
  },
  define: {
    // Add Node.js polyfills for browser
    global: 'globalThis',
    process: JSON.stringify({
      env: {
        NODE_ENV: 'development'
      }
    })
  },
  server: {
    port: 8000,
    open: '/demo/'
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});