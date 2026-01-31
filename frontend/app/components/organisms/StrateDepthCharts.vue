<script setup lang="ts">
import { useDepthDataProvider } from "@/composables/charts/depthDataProvider";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloResponse } from "@/types/utils/apollo";
import { ref } from "vue";
import { isMobile } from "@/composables/utils/isMobile";

const isDives = ref(false);

const divesCollection: ApolloResponse = await useGqlQueryManager(
  GraphqlActions.DEPTH_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const depthChartData = isDives.value
  ? useDepthDataProvider(divesCollection)
  : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <template v-if="depthChartData">
        <template v-if="!isMobile.value">
          <v-row>
            <v-col cols="3">
              <ChartPie
                :data="depthChartData.pie"
                :context="'depth_pie'"
                :height="277"
              />
              <PanelTemplate :data="depthChartData.panel" :class="['mb-4']" />
            </v-col>
            <v-col cols="9">
              <ChartLine :data="depthChartData.line" :context="'depth_line'" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <PanelTemplate :data="depthChartData.panel" :class="['mb-4']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" :class="['mx-auto']">
              <ChartPie
                :data="depthChartData.pie"
                :context="'depth_pie'"
                :height="277"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ChartLine :data="depthChartData.line" :context="'depth_line'" />
            </v-col>
          </v-row>
        </template>
      </template>
      <CardErrorData v-else />
    </template>
  </StrateTemplate>
</template>
