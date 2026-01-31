<template>
  <div
    :class="['template_base']"
    :style="{
      'background-image':
        'url(/background-animate.svg)',
    }"
  >
    <HeaderBar />
    <AlertsBucket />
    <v-main>
      <slot name="parallax"> </slot>
      <v-container :class="['template_base--container']">
        <slot name="main"> </slot>
      </v-container>
    </v-main>
    <FooterBar />
    <MenuDrawer />
  </div>
</template>
