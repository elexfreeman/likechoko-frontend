module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 8,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['prettier', 'i18n'],
  env: {
    browser: true,
    amd: true,
    es6: true,
  },
  globals: {
    ko: true,
    $: true,
    $data: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'standard', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    curly: ['error', 'all'],
    'import/no-webpack-loader-syntax': 'off',
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreComments: true }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-mixed-operators': 'error',
    'no-unexpected-multiline': 'error',
    'no-var': 'error',
    'no-unsafe-optional-chaining': 'error',
    'i18n/no-chinese-character': 'error',
    'i18n/no-russian-character': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
