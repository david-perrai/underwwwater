<script setup lang="ts">
import { useCalendarDataProvider } from "@/composables/charts/calendarDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloResponse } from "@/types/utils/apollo";
import { ref } from "vue";
import { isMobile } from "@/composables/utils/isMobile";

const isDives = ref(false);

const divesCollection: ApolloResponse = await useGqlQueryManager(
  GraphqlActions.DATES_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const calendarChartDatas = isDives.value
  ? useCalendarDataProvider(divesCollection)
  : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <template v-if="calendarChartDatas">
        <template v-if="!isMobile.value">
          <v-row>
            <v-col cols="8">
              <ChartCalendar :data="calendarChartDatas.heatmap" />
            </v-col>
            <v-col cols="4">
              <PanelTemplate :data="calendarChartDatas.panel" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <ChartCalendar :data="calendarChartDatas.heatmap" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <PanelTemplate :data="calendarChartDatas.panel" />
            </v-col>
          </v-row>
        </template>
      </template>
      <CardErrorData v-else />
    </template>
  </StrateTemplate>
</template>
