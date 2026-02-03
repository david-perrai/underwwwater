<script setup lang="ts">
import { useUserState } from "@/composables/auth";

const userState = useUserState();
import { translations } from "@/i18n/index";

const { STRATE_CALENDAR, STRATE_DEPTH, STRATE_GAS, STRATE_THEMES } =
  translations.en.PROFILE;

const { PROFILE } = translations.en.PAGES;
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
            <PageTitle :label="PROFILE" :tag="'h2'" />
            <v-list-item
              v-if="userState.avatar && userState.username"
              :prepend-avatar="'/avatars/avatar' + userState.avatar + '.png'"
              :title="userState.username"
            />
          </v-img>

          <v-container fluid>
            <Suspense>
              <StrateCalendar
                :title="STRATE_CALENDAR.TITLE"
                :subtitle="STRATE_CALENDAR.SUBTITLE"
                :icon="'$calendar'"
              />
            </Suspense>
            <Suspense>
              <StrateDepthCharts
                :title="STRATE_DEPTH.TITLE"
                :subtitle="STRATE_DEPTH.SUBTITLE"
                :icon="'$chartBellCurveCumulative'"
              />
            </Suspense>
            <Suspense>
              <StrateGasCharts
                :title="STRATE_GAS.TITLE"
                :subtitle="STRATE_GAS.SUBTITLE"
                :icon="'$gasCylinder'"
              />
            </Suspense>
            <Suspense>
              <StrateThemesCharts
                :title="STRATE_THEMES.TITLE"
                :subtitle="STRATE_THEMES.SUBTITLE"
                :icon="'$shape'"
              />
            </Suspense>
          </v-container>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
