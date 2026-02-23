<script setup lang="ts">
const navigationStore = useNavigationStore();
</script>

<template>
  <div :class="['layout layout--default']">
    <Header />

    <slot />

    <div id="modals" :class="['modals']" :data-id="'modals'">
      <!-- <PrimeDialog
        v-model:visible="navigationStore.isModalDiveVisible"
        :header="$t('dive.form.title')"
        modal
      > -->
        <FormDive />
      <!-- </PrimeDialog> -->
    </div>
  </div>
</template>
