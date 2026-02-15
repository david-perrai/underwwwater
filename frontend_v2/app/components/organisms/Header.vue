<script setup lang="ts">
import { useAuthControllerLogin } from '~/composables/api/generated/auth/auth';
import { statsControllerGetGlobalStats } from '~/composables/api/generated/stats/stats';
import { usersControllerFindMe } from '~/composables/api/generated/users/users';


/** Props */

/** Datas */
const { t } = useI18n();

const menuItems = computed(() => [
  {
    label: t('common.menu.home'),
    icon: "pi pi-home",
  },
]);

/** Stores and Composables */
const navigationStore = useNavigationStore();
const authControllerLogin = useAuthControllerLogin();

/** Computeds */

/** Functions */
/** Emits */
// const emit = defineEmits<{
//   click: [event: Event];
// }>();

/** Functions */
const handleClick = async (event: Event) => {
  console.log(event);
  // if (!props.disabled && !props.loading) {
  //   emit("click", event);
  // }


  // exemple de login avec l'api
  const res = await authControllerLogin.mutateAsync({
    data: {
      email: "user@undewwwater.com",
      password: "password123",
    },
  });


  const authStore = useAuthStore();
  if (res.status === 200) {
    authStore.setAccessToken(res.data.accessToken);
  }

  //exemple de récupération des données de l'utilisateur via api authentifié
  const myDives = await usersControllerFindMe();
  console.log(myDives);

  //exemple de récupération des données statistiques globales via api authentifié
  const globalStats = await statsControllerGetGlobalStats();
  console.log(globalStats);

};

const handleAddDive = async () => {
  await navigateTo('/dives');
  navigationStore.toggleModalDive();
};
/** Lifecyle Hooks */
</script>
s
<template>
  <header :class="['header']" :data-id="'header'">
    <PVMenubar :model="menuItems">
      <!-- Logo -->
      <template #start>
        <Logo :is-small="true" />
      </template>
      <!-- <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template> -->

      <!-- Auth -->
      <template #end>
        <div class="flex items-center gap-2">
          <Button 
            @click="handleAddDive" 
            :label="t('common.actions.add_dive', 'Add dive')" 
            severity="success" 
            class="mr-2"
          />
          <Button @click="handleClick" :label="t('common.actions.login')" />
        </div>
      </template>
    </PVMenubar>
  </header>
</template>
