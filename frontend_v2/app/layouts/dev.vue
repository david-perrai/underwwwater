<template>
  <div :class="['layout layout--sandbox']">
    <PVButton label="Verify" />

    <slot />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
