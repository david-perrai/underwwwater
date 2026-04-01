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

const handleLogout = () => {
  authStore.logout();
  navigateTo("/");
};

/** Lifecyle Hooks */
</script>

<template>
  <!-- TODO: ADAPT MOBILE VUE -->
  <PrimeDrawer
    :visible="true"
    :modal="false"
    :dismissable="false"
    :show-close-icon="false"
    style="width: 10em"
    :unstyled="true"
    :pt="{
      mask: { style: 'align-items: stretch' },
      root: { style: 'height: 100%; display: flex; flex-direction: column;' },
      content: {
        style:
          'display: flex; flex-direction: column; flex: 1; padding: 0.5rem;',
      },
      header: { style: 'padding: 1rem 0.5rem;' },
    }"
  >
    <template #header>
      <Logo :is-small="true" />
    </template>

    <nav class="menu-buttons">
      <PrimeButton
        variant="text"
        severity="secondary"
        icon="pi pi-home"
        label="Home"
        as="router-link"
        to="/dashboard"
        @click="navigationStore.isMenuOpened = false"
      />

      <PrimeButton
        variant="text"
        severity="secondary"
        icon="pi pi-chart-bar"
        label="Global Stats"
        as="router-link"
        to="/globals-stats"
        @click="navigationStore.isMenuOpened = false"
      />

      <PrimeButton
        variant="text"
        severity="secondary"
        icon="pi pi-compass"
        label="Dives"
        as="router-link"
        to="/dives"
        @click="navigationStore.isMenuOpened = false"
      />

      <PrimeButton
        variant="text"
        severity="secondary"
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
          @click="handleLogout()"
        />
      </div>
    </div>
  </PrimeDrawer>
</template>

<style lang="scss" scoped>
.logo {
  font-family: "Inter Tight", serif;
  font-size: 4rem;
  color: #ffffff;
  line-height: 1.2;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 3em;
  }

  &__highlight {
    color: #00ffef;
    font-style: normal;
  }

  &--small {
    font-size: 1.5em;
  }
}

:deep(.p-drawer) {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 10em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--ocean-bg-deep);
  border-right: 1px solid var(--ocean-border);
}

/* Header */
:deep(.p-drawer-header) {
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--ocean-border);
}

/* Contenu principal — flex colonne depuis le haut */
:deep(.p-drawer-content) {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem 0.5rem;
  overflow-y: auto;
}

/* Nav pousse le logout vers le bas */
.menu-buttons {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mt-auto {
  margin-top: auto;
}

/* Boutons alignés à gauche */
:deep(.p-button) {
  justify-content: flex-start;
  width: 100%;
}
</style>
