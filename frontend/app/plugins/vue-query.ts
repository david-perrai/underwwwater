import { dehydrate, hydrate, QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import type { DehydratedState } from '@tanstack/vue-query';
import { defineNuxtPlugin, useState } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  // Create a new QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  });

  const options = { queryClient };

  // Use the plugin
  nuxtApp.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
