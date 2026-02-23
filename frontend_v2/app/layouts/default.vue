<script setup lang="ts">

</script>

<template>
  <div :class="['layout layout--default']">
    <Header />

    <slot />

    <div id="modals" :class="['modals']" :data-id="'modals'">
        <FormDive />
    </div>
  </div>
</template>
