/* eslint-env node */
import '@rushstack/eslint-patch/modern-module-resolution';

export default {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['postcss.config.cjs'],
      env: {
        node: true,
        commonjs: true
      },
      rules: {
        'no-undef': 'off'
      }
    }
  ]
};