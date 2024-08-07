const html = require('@html-eslint/eslint-plugin');

const jsConfig = {
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
};

const htmlConfig = {
  ...html.configs['flat/recommended'],
  files: ['**/*.html'],
  rules: {
    ...html.configs['flat/recommended'].rules,
    '@html-eslint/indent': ['error', 2],
    '@html-eslint/require-closing-tags': 'off',
  },
};

module.exports = [jsConfig, htmlConfig];
