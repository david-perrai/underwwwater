<script setup lang="ts">

const severities: ("primary" | "secondary" | "success" | "info" | "warn" | "danger" | "contrast")[] = ["primary", "secondary", "success", "info", "warn", "danger", "contrast"];
</script>

<template>

  <div class="sandbox-page">
    <h1 class="typo-h1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
    <h1 class="typo-h2">Curabitur vel felis rhoncus, tincidunt diam vel.</h1>
    <h1 class="typo-h3">Fusce vel luctus dolor, vel vulputate velit.</h1>
    <h1 class="typo-h4">Proin blandit efficitur ultricies. Nullam eget pretium enim.</h1>
    <br />
    <h1 class="typo-h1--secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
    <h1 class="typo-h2--secondary">Curabitur vel felis rhoncus, tincidunt diam vel.</h1>
    <h1 class="typo-h3--secondary">Fusce vel luctus dolor, vel vulputate velit.</h1>
    <h1 class="typo-h4--secondary">Proin blandit efficitur ultricies. Nullam eget pretium enim.</h1>

    <div class="grid">
      <div v-for="severity in severities" :key="severity" class="card">
        <div class="button-group">
          <Button :label="severity" :severity="severity" />
          <Button :label="severity + ' outlined'" :severity="severity" variant="outlined" />
          <Button :label="severity + ' text'" :severity="severity" variant="text" />
          <Button :label="severity + ' link'" :severity="severity" variant="link" />
        </div>
      </div>
    </div>

        <FormDive />

  </div>
</template>

<style lang="scss" scoped>
.sandbox-page {
  padding: 2rem;
  background-color: var(--p-content-background);
  min-height: 100vh;


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
