import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["client/**/*.jsx", "server/**/*.js"],
    languageOptions: {
      globals: {
        process: "writable",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "react/prop-types": "off",
      "no-console": "error",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
