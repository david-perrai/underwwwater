<script setup lang="ts">
import { ref } from "vue";
import store from "@/store";
import { format } from "date-fns";
import { Colors } from "@/plugins/utils/colors";
import type { DiveInterface } from "@/types/global/dive";
import { GraphqlActions } from "@/types/models/graphql";
import { useGqlQueryManager } from "@/composables/gqlQueryManager";
import { useDivesCollectionLoader } from "@/composables/utils/divesCollectionLoader";
import { useGasNameProvider } from "@/composables/gasNameProvider";

const props = defineProps<{
  title: string;
  subtitle?: string;
  icon?: string;
}>();

const isDives = ref(false);

const divesCollection = await useGqlQueryManager(GraphqlActions.DIVES, {
  owner: "api/users/" + store.state.user.data.id,
}).then((result) => {
  isDives.value = result.dives.edges.length;
  return useDivesCollectionLoader(result) as DiveInterface[];
});
</script>

<template>
  <v-row :class="['mb-8']">
    <v-col>
      <v-card
        :title="props.title"
        :subtitle="props.subtitle"
        :append-icon="icon"
        :elevation="10"
        border
        rounded
      >
        <v-card-text>
          <v-list v-if="isDives" :tag="'ul'" density="compact">
            <v-list-item
              v-for="(dive, index) in divesCollection"
              :key="index"
              :value="dive"
              :tag="'li'"
            >
              <v-list-item-title
                :class="['d-flex', 'flex-row', 'justify-space-between']"
              >
                <span>
                  {{ "#" + (divesCollection.length - index) }}
                </span>
                <span>
                  {{ format(new Date(dive.date), "PP") }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle
                :class="[
                  'd-flex',
                  'justify-space-between',
                  'align-self-center',
                ]"
              >
                <v-container fluid :class="['px-0']">
                  <v-row dense :align="'center'">
                    <v-col :cols="1" :class="['d-none', 'd-md-flex']">
                      <v-icon icon="$clockOutline" />
                      {{ dive.totalTime }}mn
                    </v-col>
                    <v-col :cols="1" :class="['d-none', 'd-md-flex']">
                      <v-icon icon="$chartBellCurveCumulative" />
                      {{ dive.maxDepth }}mt
                    </v-col>
                    <v-col :cols="1" :class="['d-none', 'd-md-flex']">
                      <v-icon icon="$gasCylinder" />
                      {{ useGasNameProvider(dive.gasTanks[0].gasMix).title }}
                    </v-col>
                    <v-col :cols="7" :class="['d-none', 'd-md-block']">
                      <ChipTheme
                        :variant="'outlined'"
                        :label="dive.divingEnvironment?.label"
                        :color="Colors['theme_' + dive.divingEnvironment?.token.replaceAll('%', '') as keyof typeof Colors]"
                      />
                      <ChipTheme
                        :variant="'text'"
                        :label="dive.divingRole?.label"
                        :color="Colors['theme_' + dive.divingRole?.token.replaceAll('%', '') as keyof typeof Colors]"
                      />
                      <ChipTheme
                        v-for="(theme, index) in dive.divingType.edges"
                        :key="index"
                        :variant="'tonal'"
                        :label="theme.node.label"
                        :color="Colors['theme_' + theme.node.token.replaceAll('%', '') as keyof typeof Colors]"
                      />
                    </v-col>
                    <v-col :cols="10" :class="['d-md-none']">
                      <div>
                        <v-row>
                          <v-col :class="['d-flex', 'flex-row']">
                            <div :class="['mr-4']">
                              <v-icon icon="$clockOutline" />
                              {{ dive.totalTime }}mn
                            </div>
                            <div :class="['mr-4']">
                              <v-icon icon="$chartBellCurveCumulative" />
                              {{ dive.maxDepth }}mt
                            </div>
                            <div :class="['mr-4']">
                              <v-icon icon="$gasCylinder" />
                              {{
                                useGasNameProvider(dive.gasTanks[0].gasMix)
                                  .title
                              }}
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <ChipTheme
                              :variant="'outlined'"
                              :label="dive.divingEnvironment?.label"
                              :color="Colors['theme_' + dive.divingEnvironment?.token.replaceAll('%', '') as keyof typeof Colors]"
                            />
                            <ChipTheme
                              :variant="'text'"
                              :label="dive.divingRole?.label"
                              :color="Colors['theme_' + dive.divingRole?.token.replaceAll('%', '') as keyof typeof Colors]"
                            />
                            <ChipTheme
                              v-for="(theme, index) in dive.divingType.edges"
                              :key="index"
                              :variant="'tonal'"
                              :label="theme.node.label"
                              :color="Colors['theme_' + theme.node.token.replaceAll('%', '') as keyof typeof Colors]"
                            />
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                    <v-col :cols="2" :class="['d-flex', 'justify-end']">
                      <v-btn
                        icon="$pencil"
                        color="success"
                        size="x-small"
                        :class="['mr-2']"
                        @click="
                          navigateTo({
                            name: 'diveForm',
                            state: { dive: JSON.stringify(dive) },
                          })
                        "
                      />
                      <FormDiveDeleteModal :id="dive.id" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <CardErrorData v-else />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
