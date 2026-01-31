<script setup lang="ts">
import { FormActions } from "@/types/models/form";
import { isLogged, useAuthLogout } from "@/composables/auth";
import { isMobile } from "@/composables/utils/isMobile";
// import { menu } from "@/store/menu";
import { onMounted, ref } from "vue";
import { translations } from "@/i18n/index";
import { useAlertFactory } from "@/composables/alertFactory";
// import store from "@/store";


/**
 * Global User State composable
 */

const scrollPosition = ref(0);
const { LOGOUT } = translations.en.FORM_WORDING;
const { LOGOUT_ACCOUNT } = translations.en.ALERTS;
const menu = {
  toggleAction: () => {}
}
const userState = useUserState();

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

onMounted(() => {
  if(!import.meta.server) window.addEventListener("scroll", updateScroll);
});

</script>

<template>
  <v-app-bar
    :elevation="0"
    :color="'transparent'"
    :class="[
      scrollPosition > 0 ? 'bg-background' : 'bg-transparent',
      'bg-transition',
      'px-4',
      'header',
    ]"
  >
    <template #prepend>
      <v-btn
        v-if="isLogged()"
        variant="plain"
        icon="$menu"
        :size="'large'"
        @click="menu.toggleAction()"
      />
    </template>
    <v-app-bar-title>
      <LogoType />
    </v-app-bar-title>
    <template #append>
      <div :class="['d-flex', 'justify-center', 'align-center']">
        <p
          v-if="isLogged()"
          v-html="userState.data.username"
          :class="['d-none', 'd-sm-flex', 'mx-2']"
        />
        <v-badge v-if="isLogged()" dot color="success" :class="['mx-2']">
          <v-avatar
            v-if="userState.data.avatar"
            :image="'/avatars/avatar' + userState.data.avatar + '.png'"
            :size="isMobile.value ? 30 : 45"
          />
          <v-avatar v-else color="info" :size="isMobile.value ? 30 : 45">
            <v-icon icon="$accountCircle" />
          </v-avatar>
        </v-badge>
        <v-btn
          v-if="isLogged()"
          color="error"
          :class="['mx-4', 'd-none', 'd-md-flex']"
          :size="'default'"
          @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
        >
          {{ LOGOUT }}
        </v-btn>
        <v-btn
          v-if="isLogged()"
          color="error"
          icon="$exitToApp"
          :class="['mx-4', 'd-md-none']"
          :size="'default'"
          @click="useAuthLogout(), useAlertFactory('success', LOGOUT_ACCOUNT)"
        />
        <FormUserModal v-if="!isLogged()" :action="FormActions.LOGIN" />
      </div>
    </template>
  </v-app-bar>
</template>
