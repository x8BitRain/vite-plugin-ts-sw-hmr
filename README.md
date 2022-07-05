# vite-plugin-sw-ts-hmr

[![npm](https://img.shields.io/npm/v/vite-plugin-ts-sw-hmr.svg)](https://www.npmjs.com/package/vite-plugin-ts-sw-hmr)

Vite plugin for transpiling multiple ServiceWorkers written in TypeScript with HMR.

You can use this for any arbitrary TypeScript files, just provide an input and output,
and it will transpile with HMR.


### Installation

```bash
yarn add vite-plugin-sw-ts-hmr --dev
```

or
 
```bash
npm install vite-plugin-sw-ts-hmr --save-dev
```

### Usage

```ts
import TsServiceWorkers from 'vite-plugin-sw-ts-hmr'

export default {
  plugins: [
    TsServiceWorkers([
      {
        inputFile: 'src/firebase-messaging-sw.ts',
        outputFile: 'public/firebase-messaging-sw.js',
      },
      {
        inputFile: 'src/memes.ts',
        outputFile: 'public/memes.js',
      },
    ]),
  ]
}
```
