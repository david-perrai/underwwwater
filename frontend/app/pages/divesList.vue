<script setup lang="ts">
import { useUserState } from "@/composables/auth";

const userState = useUserState();
import { translations } from "@/i18n/index";

const { DIVES_LIST } = translations.en.PAGES;
const { TITLE, SUBTITLE } = translations.en.DIVES_LIST;
</script>

<template>
  <BaseTemplate>
    <template #main>
      <CardTemplate>
        <template #card>
          <v-img
            height="150"
            :src="'/bg-card-profile.jpg'"
            cover
            :class="['text-white']"
          >
            <PageTitle :label="DIVES_LIST" :tag="'h2'" />
            <v-list-item
              v-if="userState.data.avatar && userState.data.username"
              :prepend-avatar="'/avatars/avatar' + userState.data.avatar + '.png'"
              :title="userState.data.username"
            ></v-list-item>
          </v-img>

          <v-container fluid>
            <Suspense>
              <DivesList
                :title="TITLE"
                :subtitle="SUBTITLE"
                :icon="'$formatListBulleted'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
