import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3001/api-json',
    },
    output: {
      mode: 'tags-split',
      target: './app/composables/api/generated',
      schemas: './app/composables/api/generated/model',
      client: 'vue-query',
      override: {
        mutator: {
          path: './app/composables/api/fetch-instance.ts',
          name: 'authFetch',
        },
      },
    },
  },
});
