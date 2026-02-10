<script setup lang="ts">
import Button from "~/components/atoms/Button.vue";

const severities: ("primary" | "secondary" | "success" | "info" | "warn" | "danger" | "contrast")[] = ["primary", "secondary", "success", "info", "warn", "danger", "contrast"];
</script>

<template>
  <div class="sandbox-page">
    <h1>Button Showcase (Neon/Dark Theme)</h1>
    
    <div class="grid">
      <div v-for="severity in severities" :key="severity" class="card">
        <h3>{{ severity }}</h3>
        <div class="button-group">
          <Button :label="severity" :severity="severity" />
          <Button :label="severity + ' outlined'" :severity="severity" outlined />
          <Button :label="severity + ' text'" :severity="severity" text />
          <Button :label="severity + ' raised'" :severity="severity" raised />
          <Button :label="severity + ' rounded'" :severity="severity" rounded />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sandbox-page {
  padding: 2rem;
  background-color: var(--p-content-background);
  min-height: 100vh;
  color: white;

  h1 {
    margin-bottom: 2rem;
    color: var(--p-primary-color);
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    text-transform: capitalize;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  // Align items to start
  align-items: flex-start;
}
</style>
