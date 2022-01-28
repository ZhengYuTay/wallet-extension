import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import { r, isDev } from './scripts/utils'
import packageJson from './package.json'
import copy from 'rollup-plugin-copy'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev
      ? {
          include: [r('src/contentScripts/**/*'), r('src/components/**/*')]
        }
      : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.tsx'),
      name: packageJson.name,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
        extend: true
      }
    }
  },
  plugins: [
    ...sharedConfig.plugins!,
    copy({
      targets: [
        {
          src: r('src/contentScripts/script.js'),
          dest: r('extension/dist/contentScripts')
        }
      ],
      hook: 'writeBundle' // notice here
    })
  ]
})
