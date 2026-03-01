<script setup lang="ts">

const severities: ("primary" | "secondary" | "info" | "success" | "warn" | "danger" | "contrast")[] = ["primary", "secondary", "success", "info", "warn", "danger", "contrast"];
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

    <div class="col">
      <div v-for="severity in severities" :key="severity" class="flex">
          <PrimeButton
            :label="'Plain ' + severity" 
            :severity="severity" 
            variant="plain" 
          />
          <PrimeButton
            :label="'Outlined ' + severity" 
            :severity="severity" 
            variant="outlined" 
          />
          <PrimeButton
            :label="'Text ' + severity" 
            :severity="severity" 
            variant="text" 
          />
      </div>

          <PrimeButton
            :label="'Link'" 
            variant="link" 
          />
    </div>

        <FormDive />

  </div>
</template>

<style lang="scss" scoped>
.sandbox-page {
  padding: 2rem;
  background-color: var(--p-content-background);
  min-height: 100vh;
  color: white;

}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
.flex {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>