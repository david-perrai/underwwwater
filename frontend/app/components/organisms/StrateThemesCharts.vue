<script setup lang="ts">
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { GraphqlActions } from "@/types/models/graphql";
import { DivingThemeInterface } from "@/types/global/divingTheme";
import store from "@/store";
import { ApolloQueryResult } from "@apollo/client";
import { useThemesDataProvider } from "@/composables/charts/themesDataProvider";
import { ref } from "vue";
import { isMobile } from "@/composables/utils/isMobile";

const isDives = ref(false);

const divingEnvironmentsItems: DivingThemeInterface[] =
  await useGqlQueryManager(GraphqlActions.DIVING_ENVIRONMENTS).then(
    (result) => {
      return result["divingEnvironments" as keyof typeof result].edges.map(
        (item: { node: DivingThemeInterface }) => item.node
      );
    }
  );

const divingRolesItems: DivingThemeInterface[] = await useGqlQueryManager(
  GraphqlActions.DIVING_ROLES
).then((result) => {
  return result["divingRoles" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const divingTypesItems: DivingThemeInterface[] = await useGqlQueryManager(
  GraphqlActions.DIVING_TYPES
).then((result) => {
  return result["divingTypes" as keyof typeof result].edges.map(
    (item: { node: DivingThemeInterface }) => item.node
  );
});

const divesCollection: ApolloQueryResult<unknown> = await useGqlQueryManager(
  GraphqlActions.THEMES_BY_DIVES,
  {
    owner: "api/users/" + store.state.user.data.id,
  }
).then((result) => {
  isDives.value = result.dives.edges.length;
  return result;
});

const themesChartData = isDives.value
  ? useThemesDataProvider(divesCollection, [
      divingEnvironmentsItems,
      divingRolesItems,
      divingTypesItems,
    ])
  : null;
</script>

<template>
  <StrateTemplate>
    <template #strate>
      <template v-if="themesChartData">
        <template v-if="!isMobile.value">
          <v-row>
            <v-col cols="3">
              <ChartDoughnut
                :data="themesChartData.doughnuts[0]"
                :context="'themes_doughnut'"
              />
            </v-col>
            <v-col cols="3">
              <ChartDoughnut
                :data="themesChartData.doughnuts[1]"
                :context="'themes_doughnut'"
              />
            </v-col>
            <v-col cols="6">
              <ChartProgress :data="themesChartData.progress" />
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-row>
            <v-col cols="9" :class="['mx-auto']">
              <ChartDoughnut
                :data="themesChartData.doughnuts[0]"
                :context="'themes_doughnut'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" :class="['mx-auto']">
              <ChartDoughnut
                :data="themesChartData.doughnuts[1]"
                :context="'themes_doughnut'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ChartProgress :data="themesChartData.progress" />
            </v-col>
          </v-row>
        </template>
      </template>
      <CardErrorData v-else />
    </template>
  </StrateTemplate>
</template>
