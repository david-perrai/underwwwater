<script setup lang="ts">
const navigationStore = useNavigationStore();
</script>

<template>
  <div :class="['layout layout--default']">
    <Header />

    <slot />

    <div id="modals" :class="['modals']" :data-id="'modals'">
      <Modal 
        :visible="navigationStore.isModalDiveVisible"
        @update:visible="navigationStore.toggleModalDive"
      >
        <FormDive />
      </Modal>
    </div>
  </div>
</template>
