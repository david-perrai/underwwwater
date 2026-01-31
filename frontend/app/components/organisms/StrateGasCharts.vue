<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import store from "@/store";
import { ApolloResponse } from "@/types/utils/apollo";
import { useGasDataProvider } from "@/composables/charts/gasDataProvider";
import { ref } from "vue";
import { isMobile } from "@/composables/utils/isMobile";

const isDives = ref(false);

const divesCollection: ApolloResponse = await useGqlQueryManager(
  GraphqlActions.GAS_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const gasChartData = isDives.value ? useGasDataProvider(divesCollection) : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <template v-if="gasChartData">
        <template v-if="!isMobile.value">
          <v-row>
            <v-col cols="3" :align-self="'center'">
              <PanelTemplate :data="gasChartData.panel" :class="['mb-4']" />
              <ChartDoughnut
                :data="gasChartData.doughnut"
                :context="'gas_doughnut'"
                :height="277"
              />
            </v-col>
            <v-col cols="9" :align-self="'center'">
              <ChartBar :data="gasChartData.bar" :context="'gas_bar'" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col>
              <PanelTemplate :data="gasChartData.panel" :class="['mb-4']" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" :class="['mx-auto']">
              <ChartDoughnut
                :data="gasChartData.doughnut"
                :context="'gas_doughnut'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ChartBar :data="gasChartData.bar" :context="'gas_bar'" />
            </v-col>
          </v-row>
        </template>
      </template>
      <CardErrorData v-else />
    </template>
  </StrateTemplate>
</template>
