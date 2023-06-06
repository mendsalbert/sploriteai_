// {
//   "extends": "next",
//   "rules": {
//     "react/no-unescaped-entities": "off",
//     "@next/next/no-page-custom-font": "off"
//   }
// }

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
