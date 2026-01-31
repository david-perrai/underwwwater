<script setup lang="ts">
import { Colors } from "@/plugins/utils/colors";
import type { CalendarHighlightItem } from "@/types/charts/calendar";
import type { PanelData } from "../../types/charts/panel";
import { isMobile } from "@/composables/utils/isMobile";

const props = defineProps<{
  data: PanelData;
}>();

console.log(typeof Colors.gold);
</script>

<template>
  <v-card rounded border :class="['template_panel']">
    <v-list :class="['template_panel--list']">
      <template v-if="!isMobile.value">
        <v-row v-for="(row, rowIndex) in props.data.rows" :key="rowIndex" dense>
          <v-col v-for="(col, colIndex) in row.cols" :key="colIndex">
            <template v-if="!col.dropdown">
              <v-list-item v-if="col.highlight" :title="col.title">
                <v-list-item-subtitle
                  v-for="(subtitle, index) in col.subtitle"
                  :key="index"
                >
                  <v-icon
                    icon="$star"
                    :size="16"
                    :color="
                      index === 0
                        ? Colors.gold
                        : index === 1
                        ? Colors.silver
                        : Colors.bronze
                    "
                  />
                  {{ subtitle }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item
                v-else
                :title="col.title"
                :subtitle="(col.subtitle[0] as string)"
              ></v-list-item>
            </template>
            <template v-else>
              <v-menu
                :align-self="'center'"
                :class="['text-center', 'align-middle']"
              >
                <template #activator="{ props }">
                  <v-btn color="primary" v-bind="props"> Years Stats </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in (col.subtitle as CalendarHighlightItem[])"
                    :key="index"
                  >
                    <v-list-item-title>{{
                      item.title +
                      " (" +
                      item.subtitle +
                      "dive" +
                      (item.subtitle > 1 ? "s)" : ")")
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <template v-for="(row, rowIndex) in props.data.rows" :key="rowIndex">
            <v-col
              v-for="(col, colIndex) in row.cols"
              :cols="6"
              :key="colIndex"
              dense
            >
              <template v-if="!col.dropdown">
                <v-list-item v-if="col.highlight" :title="col.title">
                  <v-list-item-subtitle
                    v-for="(subtitle, index) in col.subtitle"
                    :key="index"
                  >
                    <v-icon
                      icon="$star"
                      :size="16"
                      :color="
                        index === 0
                          ? Colors.gold
                          : index === 1
                          ? Colors.silver
                          : Colors.bronze
                      "
                    />
                    {{ subtitle }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item
                  v-else
                  :title="col.title"
                  :subtitle="(col.subtitle[0] as string)"
                ></v-list-item>
              </template>
              <template v-else>
                <v-menu
                  :align-self="'center'"
                  :class="['text-center', 'align-middle']"
                >
                  <template #activator="{ props }">
                    <v-btn color="primary" v-bind="props"> Years Stats </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in (col.subtitle as CalendarHighlightItem[])"
                      :key="index"
                    >
                      <v-list-item-title>{{
                        item.title +
                        " (" +
                        item.subtitle +
                        "dive" +
                        (item.subtitle > 1 ? "s)" : ")")
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-list>
  </v-card>
</template>
