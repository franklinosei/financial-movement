import globals from "globals";
import jsPlugin from "@eslint/js";

export default [
  jsPlugin.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "warn", // Disallow the use of console in production
      "prefer-const": "warn", // Prefer const over let for variables that are never reassigned
      "no-var": "warn", // Disallow the use of var, use let or const instead
      "object-shorthand": "warn", // Require object literal shorthand syntax
      "arrow-parens": ["warn", "as-needed"], // Enforce consistent parentheses around arrow function parameters
      "prefer-arrow-callback": "warn", // Prefer arrow functions over anonymous function expressions
      "no-process-exit": "warn", // Disallow the use of process.exit()
    },
  },
];
