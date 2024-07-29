const globals = require('globals');
const html = require('@html-eslint/eslint-plugin');
const js = require('@eslint/js');
const scss = require('stylelint-scss');
const standardScss = require('stylelint-config-standard-scss');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const { FlatCompat } = require('@eslint/eslintrc');
const { DIR } = require('./webpack.helpers');

const COMPAT_JS = new FlatCompat({
  baseDirectory: DIR,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...COMPAT_JS.extends('eslint:recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: 'babel-eslint',
      },
    },
  },
  {
    files: ['**/*.scss'],
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    ...prettierConfig,
  },
  {
    files: ['*.js'],
    rules: {
      'array-bracket-spacing': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'no-undef': 0,
      'no-console': 0,
      eqeqeq: 0,
      strict: 0,
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'comma-dangle': 'off',
      curly: 'error',
      'no-else-return': 'error',
      'dot-notation': 'error',
      'dot-location': 'error',

      'max-len': [
        'error',
        {
          code: 90,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],

      indent: ['error', 2],
      'no-var': 'error',

      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],

      'getter-return': 'error',
      'no-extra-boolean-cast': 'error',
      'no-irregular-whitespace': 'error',
      'valid-typeof': 'error',
      quotes: ['error', 'single'],
      'space-before-function-paren': ['error', 'always'],
    },
  },
  {
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/require-closing-tags': 'off',
    },
  },
  {
    files: ['**/*.scss'],
    extends: [standardScss],
    plugins: [scss],
  },
  {
    files: ['**/*.css'],
    extends: ['stylelint-config-standard'],
  }
];
