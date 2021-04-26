// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['jest', 'prettier', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': ['error', 'always', { js: 'never', ts: 'never' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-sync': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': 'error',
  },
};
