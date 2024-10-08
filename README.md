[npm]: https://img.shields.io/npm/v/rollup-plugin-string-import
[npm-url]: https://www.npmjs.com/package/rollup-plugin-string-import
[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-string-import
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-string-import

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# rollup-plugin-string-import

🍣 A Rollup plugin to import any file as a string with proper TypeScript support

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+) and Rollup v1.20.0+.

## Install

Using `npm`:

```bash
npm install -D rollup-plugin-string-import
```

or `yarn`

```bash
yarn add -D rollup-plugin-string-import
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import { importAsString } from 'rollup-plugin-string-import';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [
    importAsString({
      include: ['**/*.txt', '**/*.frag', '**/*.vert'],
      exclude: ['**/*.test.*'],
    }),
  ],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).  
In runtime, all matching files will be imported as strings, same as if they were defined in TypeScript files like this:

```typescript
export default `This is a
text file
content!`;
```

Optionally, you can create a `.d.ts` file to let TypeScript know that such imports should be treated as strings:

```typescript
// string-import.d.ts

declare module '*.txt' {
  const file: string;
  export default file;
}

declare module '*.vert' {
  const file: string;
  export default file;
}

declare module '*.frag' {
  const file: string;
  export default file;
}
```

## Options

### `include`

Type: `String` | `Array[...String]`<br>

A [picomatch pattern](https://github.com/micromatch/picomatch), or array of patterns, which specifies the files in the build the plugin should operate on.

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `undefined`

A [picomatch pattern](https://github.com/micromatch/picomatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `transform`

Type: `(content: String, file: String) => String`<br>
Default: `content => content`

A transformer function that will be applied to each matched file. In this example, we append "Hello World" to each `.txt` file:

```typescript
...
    importAsString({
      include: ['**/*.txt', '**/*.frag', '**/*.vert'],
      exclude: ['**/*.test.*'],
      transform:
        (content, file) => file.endsWith('.txt') ? `${content}\nHello World` : content,
    }),
...
```

## Meta

Licensed under the GPL version 3.0 or higher
