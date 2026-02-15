<script setup lang="ts">
/** Props */
defineProps<{
  title?: string;
}>();

/** Emits */
const emit = defineEmits<{
  close: [];
}>();

/** Functions */
const close = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close" :data-id="'modal'">
      <div class="modal-content">
        <button class="modal-close" @click="close">
          <i class="pi pi-times" />
        </button>
        <div v-if="title" class="modal-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--surface-card, #fff);
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  max-width: 90%;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--text-color);
}
</style>
