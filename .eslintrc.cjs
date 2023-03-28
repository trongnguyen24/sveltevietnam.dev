module.exports = {
  root: true,
  extends: ['@vnphanquang/eslint-config-svelte', '@unocss'],
  globals: {
    App: 'readonly',
    gtag: 'readonly',
    __BUILD_TIMESTAMP__: 'readonly',
    __BUILD_HASH__: 'readonly',
    __BUILD_VERSION__: 'readonly',
  },
};
