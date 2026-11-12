import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import base from "./base.js";

export default defineConfig([
  base,
  reactRefresh.configs.vite,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
