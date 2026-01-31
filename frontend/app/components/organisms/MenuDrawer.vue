<script setup lang="ts">
import { isLogged, useUserState } from "@/composables/auth";
import { useMenuState } from "@/composables/menu";
import { translations } from "@/i18n/index";

const { HOME, PROFILE, DIVES_LIST, ADD_DIVE, SETTINGS, STATS } =
  translations.en.PAGES;
const menu = useMenuState();
const userState = useUserState();

</script>



<template>
  <v-navigation-drawer v-model="menu.isOpen" :temporary="true">
    <template
      v-if="
        isLogged() &&
        userState.data.avatar &&
        userState.data.username
      "
    >
      <v-list-item
        :prepend-avatar="'/avatars/avatar' + userState.data.avatar + '.png'"
        :title="userState.data.username"
      />
      <v-divider />
    </template>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="$viewDashboard"
        :title="HOME"
        value="home"
        link
        @click="navigateTo('/')"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$divingScuba"
        :title="PROFILE"
        value="profile"
        link
        @click="navigateTo({ name: 'profile' })"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$formatListBulleted"
        :title="DIVES_LIST"
        value="dive_list"
        link
        @click="navigateTo({ name: 'divesList' })"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$plus"
        :title="ADD_DIVE"
        value="add-dive"
        link
        @click="navigateTo({ name: 'diveForm' })"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$cog"
        :title="SETTINGS"
        value="settings"
        link
        @click="navigateTo({ name: 'settings' })"
      ></v-list-item>
      <v-list-item
        v-if="isLogged()"
        prepend-icon="$podium"
        :title="STATS"
        value="stats"
        link
        @click="navigateTo({ name: 'stats' })"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
