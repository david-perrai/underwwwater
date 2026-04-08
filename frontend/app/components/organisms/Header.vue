<script setup lang="ts">
import { Avatar } from "primevue";
/** Props */

/** Datas */
const { t } = useI18n();

/** Stores and Composables */
const navigationStore = useNavigationStore();
const userStore = useUserStore();
const user = computed(() => userStore.user);

/** Computeds */

/** Functions */
/** Emits */
/** Functions */

const handleAddDive = async () => {
  navigationStore.toggleModalDive();
};
/** Lifecyle Hooks */
</script>

<template>
  <div class="header-menu">
    <PrimeButton severity="success" @click="handleAddDive" size="small">
      <img
        src="/assets/images/scuba-diving-icon.png"
        alt=""
        width="20"
        height="20"
      />
      <span>{{ t("dive.form.submit") }}</span>
    </PrimeButton>

    <Avatar
      :image="getAvatarUrl(user?.avatar)"
      :label="
        !user?.avatar ? user?.username?.charAt(0).toUpperCase() : undefined
      "
      shape="circle"
      size="normal"
      style="cursor: pointer"
      @click="navigateTo('/account')"
    />
  </div>
</template>

<style scoped>
.header-menu {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  align-items: center;
  gap: 1em;
  padding-right: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>
