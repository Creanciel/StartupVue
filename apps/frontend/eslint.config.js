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
