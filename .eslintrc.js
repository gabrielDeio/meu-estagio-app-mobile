
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended', 
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json', 
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};