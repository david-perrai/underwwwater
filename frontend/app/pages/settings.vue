<template>
  <BaseTemplate>
    <template #main>
      <CardTemplate>
        <template #card>
          <FormSettingsEdit />
          <v-divider :class="['my-10']"></v-divider>
          <FormSettingsDelete />
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
