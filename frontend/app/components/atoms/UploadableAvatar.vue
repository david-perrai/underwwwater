<script setup lang="ts">
import { Avatar } from "primevue";
import { ref } from "vue";

const props = defineProps({
  imageUrl: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["onAvatarChange"]);

const fileInput = ref<HTMLInputElement | null>(null);

function triggerUpload() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  emit("onAvatarChange", file);
}
</script>

<template>
  <div class="avatar-upload" @click="triggerUpload">
    <Avatar
      :image="props.imageUrl"
      :label="!props.imageUrl ? props.label : undefined"
      size="xlarge"
      shape="circle"
    />

    <!-- Overlay au hover -->
    <div class="avatar-overlay">
      <i class="pi pi-camera" />
    </div>

    <!-- Bouton badge en bas à droite -->
    <PrimeButton
      class="avatar-edit-btn"
      severity="success"
      @click.stop="triggerUpload"
    >
      <i class="pi pi-pencil" />
    </PrimeButton>

    <!-- Input caché -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden-input"
      @change="onFileChange"
    />
  </div>
</template>

<style scoped>
.avatar-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 50%;
}

/* Overlay sombre au hover sur tout l'avatar */
.avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  font-size: 1.2rem;
}

.avatar-upload:hover .avatar-overlay {
  opacity: 1;
}

/* Petit bouton badge en bas à droite */
.avatar-edit-btn {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.65rem;
  z-index: 1;
}

.hidden-input {
  display: none;
}
</style>
