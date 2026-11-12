import { defineConfig } from "orval";

export default defineConfig({
  aulia: {
    input: "../../../openapi/aulia.yaml",
    output: {
      target: "src/generated/aulia.ts",
      client: "fetch",
      override: {
        mutator: {
          path: "src/fetcher.ts",
          name: "fetcher",
        },
      },
    },
  },
});
