<script setup lang="ts">
/** Props */
const props = defineProps<{
  isSmall?: boolean;
}>();
/** Datas */

/** Stores and Composables */
const navigationStore = useNavigationStore();
const authStore = useAuth();

/** Computeds */

/** Functions */

/** Lifecyle Hooks */
</script>

<template>
<PrimeDrawer v-model:visible="navigationStore.isMenuOpened">
    <template #header>
        <Logo :is-small="true" />
    </template>

    <div class="flex flex-col h-full">
      <nav class="flex-grow">

            <PrimeButton 
              variant="text" 
              severity="secondary" 
              class="w-full !justify-start" 
              icon="pi pi-home" 
              label="Home" 
              as="router-link" 
              to="/dashboard"
              @click="navigationStore.isMenuOpened = false"
            />
    
            <PrimeButton 
              variant="text" 
              severity="secondary" 
              class="w-full !justify-start" 
              icon="pi pi-chart-bar" 
              label="Global Stats" 
              as="router-link" 
              to="/globals-stats"
              @click="navigationStore.isMenuOpened = false"
            />

            <PrimeButton 
              variant="text" 
              severity="secondary" 
              class="w-full !justify-start" 
              icon="pi pi-compass" 
              label="Dives" 
              as="router-link" 
              to="/dives"
              @click="navigationStore.isMenuOpened = false"
            />
      
            <PrimeButton 
              variant="text" 
              severity="secondary" 
              class="w-full !justify-start" 
              icon="pi pi-cog" 
              label="Account" 
              as="router-link" 
              to="/account"
              @click="navigationStore.isMenuOpened = false"
            />
      </nav>

      <div class="mt-auto">
        <div class="teal-divider" />
        <div class="flex items-center gap-2 pb-4">
          <PrimeButton 
            label="Logout" 
            icon="pi pi-sign-out" 
            class="flex-auto" 
            severity="danger" 
            variant="text" 
            @click="authStore.logout()"
          />
        </div>
      </div>
    </div>
</PrimeDrawer>
</template>

<style lang="scss" scoped>
.logo {
  font-family: 'Inter Tight', serif;
  font-size: 4rem;
  color: #ffffff;
  line-height: 1.2;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  &__highlight {
    color: #00FFEF;
    font-style: normal;
    font-family: 'Inter Tight', sans-serif;
  }

  &--small {
    font-size: 1.25rem;
  }
}
</style>
