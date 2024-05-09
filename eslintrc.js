module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Your ESLint rules here
  },
};
