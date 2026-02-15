<script setup lang="ts">
const navigationStore = useNavigationStore();
</script>

<template>
  <div :class="['layout layout--default']">
    <Header />

    <slot />

    <div id="modals" :class="['modals']" :data-id="'modals'">
      <Modal 
        v-if="navigationStore.isModalDiveVisible" 
        @close="navigationStore.toggleModalDive()"
      >
        <FormDive />
      </Modal>
    </div>
  </div>
</template>
