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

/** Computeds */

/** Functions */
/** Emits */
// const emit = defineEmits<{
//   click: [event: Event];
// }>();

/** Functions */

const handleAddDive = async () => {  
  navigationStore.toggleModalDive();
};
/** Lifecyle Hooks */
</script>
s
<template>
  <header :class="['header']" :data-id="'header'">
    <PrimeMenubar :model="menuItems">
      <!-- Logo -->
      <template #start>
        <div class="flex items-center gap-4">
          <PrimeButton 
            icon="pi pi-bars" 
            variant="text" 
            severity="secondary"
            @click="navigationStore.toggleMenu()" 
          />
          <Logo :is-small="true" />
        </div>
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
          <PrimeButton 
            :label="t('dive.form.submit')" 
            severity="success" 
            @click="handleAddDive" 
          />          
        </div>
      </template>
    </PrimeMenubar>
  </header>
</template>
