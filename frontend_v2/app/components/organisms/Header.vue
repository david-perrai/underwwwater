<script setup lang="ts">
/** Props */

/** Datas */
const menuItems = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
]);

/** Stores and Composables */

/** Computeds */

/** Functions */
/** Emits */
// const emit = defineEmits<{
//   click: [event: Event];
// }>();

/** Functions */
const handleClick = (event: Event) => {
  console.log(event);
  // if (!props.disabled && !props.loading) {
  //   emit("click", event);
  // }
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
        <Button @click="handleClick" :label="'login'" />
      </template>
    </PVMenubar>
  </header>
</template>
