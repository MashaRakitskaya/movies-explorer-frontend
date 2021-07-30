module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "react/prop-types": ["off"],
    "react/jsx-key": [
      "warn",
      { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true },
    ],
    "prettier/prettier": [
      "warn",
      { endOfLine: "auto", singleQuote: false },
      { usePrettierrc: true },
    ],
    "no-console": "warn",
    "spaced-comment": ["warn", "always"],
  },
};
