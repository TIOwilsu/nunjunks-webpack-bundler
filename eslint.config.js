const globals = require('globals',);
const path = require('node:path',);
const js = require('@eslint/js',);
const { FlatCompat, } = require('@eslint/eslintrc',);

const dirname = path.dirname(__dirname,);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
},);

module.exports = [
  {
    ...compat.extends('eslint:recommended',),
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
    rules: {
      'array-bracket-spacing': ['error', 'never',],
      'arrow-parens': ['error', 'always',],
      'no-undef': 0,
      'no-console': 0,
      eqeqeq: 0,
      strict: 0,
      semi: ['error', 'always',],
      'eol-last': ['error', 'always',],
      'comma-dangle': ['error', 'always',],
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

      indent: ['error', 2,],
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
      quotes: ['error', 'single',],
      'space-before-function-paren': ['error', 'always',],
    },
  },
];
