<script setup lang="ts">
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { DepthData } from "@/types/charts/depth";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: DepthData["pie"];
  context: string;
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<template>
  <Pie
    :options="globalOptionsProvider(context, props.data)"
    :data="props.data"
    :chart-id="'pie-chart'"
  />
</template>
