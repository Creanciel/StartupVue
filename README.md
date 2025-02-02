# StartupVue

とりあえず Vue の開発環境を整えるための手順

## 設定対象

- Vue
- Vite
- ESLint
- TailwindCSS
- Storybook

## 手順

### Vite + Vue のインストール

Vite とともに Vue の環境設定も行う。

```sh
npm create vite@latest
```

<details>
<summary>Output</summary>

```text
> npx
> create-vite

✔ Project name: … startup-vue
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript
```

</details>

### ESLint のインストール

ESLint の設定

TypeScript と Vue のプラグインも同時に設定。

eslint.config.js が生成される。

```sh
npm init @eslint/config@latest
```

<details>
<summary>Output</summary>

```text
> startup-vue@0.0.0 npx
> create-config

@eslint/create-config: v1.4.0

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

</details>

<details>
<summary>eslint.config.js</summary>

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];
```

</details>

### ESLint の設定

<details>
<summary>eslint.config.js</summary>

```js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      'no-console': ['warn'],
      'indent': ['error', 2, {
        ArrayExpression: 1,
        ObjectExpression: 1,
        SwitchCase: 1,
      }],
      'no-multi-spaces': ['error', {
        ignoreEOLComments: true,
        exceptions: {
          Property: false,
        },
      }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      }],
      'prefer-const': ['error', {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false,
      }],
      'no-constant-condition': ['warn'],
      'array-bracket-newline': ['error', 'consistent'],
      'array-element-newline': ['error', 'consistent'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
      }],
      'object-curly-newline': ['error', {
        multiline: true,
        consistent: true,
      }],
      'no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      }],
      'key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
      'vue/no-unused-properties': ['error', {
        'groups': ['props', 'data', 'computed', 'methods', 'setup'],
        'deepData': false,
        'ignorePublicMembers': false,
        'unreferencedOptions': [],
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      }],
    },
  },
];
```

</details>

## TailwindCSS のインストール

```sh
npm install --save-dev tailwindcss @tailwindcss/vite
```

### TailwindCSS の設定

`vite.config.js` で指定

```diff
 import { defineConfig } from 'vite';
 import vue from '@vitejs/plugin-vue';
+import tailwindcss from '@tailwindcss/vite';

 // https://vite.dev/config/
 export default defineConfig({
-  plugins: [vue()],
+  plugins: [vue(), tailwindcss()],
 });
```

`style.css` で

```css
@import "tailwindcss";
```

## Storybook

```sh
npx storybook@latest init
```

### Storybook に tailwind を適用する

Storybook は Vite の `main.ts` を見ていないので別途 CSS ファイルを読み込む必要がある。

`preview.ts`

```typescript
import '../src/style.css';
```
