<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import Zoom from "chartjs-plugin-zoom";
import { DepthData } from "@/types/charts/depth";
import { globalOptionsProvider } from "@/composables/charts/globalOptionsProvider";

const props = defineProps<{
  data: DepthData["line"];
  context: string;
}>();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Zoom,
  TimeScale
);
</script>

<template>
  <Line
    :options="globalOptionsProvider(context, props.data)"
    :data="props.data"
    :chart-id="'line-chart'"
    :class="['chart_zoomable']"
  />
</template>
