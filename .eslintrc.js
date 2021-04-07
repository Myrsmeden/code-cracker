module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: false,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-var': ['error'],
    'no-console': ['off'],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    'no-mixed-spaces-and-tabs': ['warn'],
    'node/no-unpublished-require': ['off'],
    'prefer-const': [2, { destructuring: 'all' }],
    'object-shorthand': [2, 'always'],
  },
};
