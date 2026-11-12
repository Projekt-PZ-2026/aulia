import { defineConfig } from "eslint/config";
import base from "./base.js";

export default defineConfig([
  base,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "react-dom",
                "react-dom/*",
                "react-native",
                "react-native/*",
              ],
              message: "Shared packages must not depend on a platform.",
            },
          ],
        },
      ],
    },
  },
]);
