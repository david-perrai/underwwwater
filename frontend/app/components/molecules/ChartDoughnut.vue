<script setup lang="ts">
import { GasData } from "@/types/charts/gas";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: GasData["doughnut"];
  context: string;
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Doughnut
    :options="globalOptionsProvider(context, props.data)"
    :data="props.data"
    :chart-id="'doughnut'"
  />
</template>
