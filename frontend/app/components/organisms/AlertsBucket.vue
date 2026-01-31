<script setup lang="ts">
const alerts = useState<any[]>("alerts", () => []);
</script>

<template>
  <ul :class="['alerts_container', 'position-fixed']">
    <v-alert
      v-for="(component, index) in alerts"
      :tag="'li'"
      :class="['px-4', 'py-4']"
      :key="index"
      :type="component.type"
      closable
      width="100%"
      @click="alerts = alerts.filter((_, i) => i !== index)"
    >
      {{ component.message }}
    </v-alert>
  </ul>
</template>

<style lang="scss" scoped>
.alerts_container {
  width: 100%;
  top: 64px;
  z-index: 10;
}
</style>
