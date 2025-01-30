# vite-plugin-ts-sw-hmr

[![npm](https://img.shields.io/npm/v/vite-plugin-ts-sw-hmr.svg)](https://www.npmjs.com/package/vite-plugin-ts-sw-hmr)

Vite plugin for bundling multiple ServiceWorkers written in TypeScript with HMR.

You can use this for any arbitrary TypeScript files, just provide an input and output,
and it will bundling with hot reloading.


### Installation
 
```bash
npm install vite-plugin-ts-sw-hmr --save-dev
```

### Usage

```ts
import bundleSwPlugin from 'vite-plugin-ts-sw-hmr'

export default {
  plugins: [
    bundleSwPlugin([
      {
        inputFile: 'src/firebase-messaging-sw.ts',
        outputFile: 'public/firebase-messaging-sw.js',
      },
      {
        inputFile: 'src/memes.ts',
        outputFile: 'public/memes.js',
      },
    ], 
    {
     // esbuild config (optional)
    }),
  ]
}
```
