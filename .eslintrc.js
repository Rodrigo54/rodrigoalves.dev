module.exports = {
  parser: `@typescript-eslint/parser`,
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    quotes: 'off',
    '@typescript-eslint/quotes': [
      2,
      'backtick',
      {
        avoidEscape: true,
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
  },
};
