import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3001/api-json',
    },
    output: {
      mode: 'tags-split',
      target: './app/api/generated',
      schemas: './app/api/generated/model',
      client: 'vue-query',
      override: {
        mutator: {
          path: './app/api/fetch-instance.ts',
          name: 'authFetch',
        },
      },
    },
  },
});
