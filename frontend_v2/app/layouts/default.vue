<template>
  <div :class="['layout layout--default']">
    <p>Some default layout content shared across all pages</p>

    <PVButton label="Verify" />

    <slot />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
