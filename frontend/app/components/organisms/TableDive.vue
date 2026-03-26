<script setup lang="ts">
import { format } from "date-fns";

const diveStore = useDiveStore();

// ─── Filtres colonnes ─────────────────────────────────────────────────────────
const filterDate = ref<Date | null>(null);
const filterDepth = ref<number | null>(null);
const filterDuration = ref<number | null>(null);
const filterEnvironment = ref("");

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function debounce(callback: () => void) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, 400);
}

function onFilterChange() {
  debounce(() => {
    diveStore.applyFilters({
      ...(filterDate.value
        ? { date: format(filterDate.value, "yyyy-MM-dd") }
        : {}),
      ...(filterDepth.value ? { maxDepth: filterDepth.value } : {}),
      ...(filterDuration.value ? { totalTime: filterDuration.value } : {}),
      ...(filterEnvironment.value
        ? { divingEnvironment: filterEnvironment.value }
        : {}),
    });
  });
}

function onDepthChange(event: any) {
  debounce(() => {
    filterDepth.value = event.value;
    onFilterChange();
  });
}

function onDurationChange(event: any) {
  debounce(() => {
    filterDuration.value = event.value;
    onFilterChange();
  });
}


watch(
  () => diveStore.activeFilters.date,
  (newDate) => {
    if (newDate) {
      filterDate.value = new Date(newDate);
    } else {
      filterDate.value = null;
    }
  }
);

// ─── Scroll infini ────────────────────────────────────────────────────────────
const loadMoreDives = () => {
  diveStore.fetchList();
};
</script>

<template>
  <h2>My dives list</h2>
  <PrimeDataTable
    :value="diveStore.list"
    :scrollable="true"
    scrollHeight="300px"
    :virtualScrollerOptions="{
      lazy: true,
      onLazyLoad: loadMoreDives,
      itemSize: 46,
    }"
  >
    <!-- ── Filtres backend ──────────────────────────────────────────────── -->
    <div
      :style="{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'nowrap',
        alignItems: 'center',
      }"
    >
      <PrimeInputText
        v-model="filterEnvironment"
        placeholder="Environment"
        @update:modelValue="onFilterChange"
        showClear
      />
      <PrimeDatePicker
        v-model="filterDate"
        :style="{ minWidth: '20em' }"
        date-format="dd/mm/yy"
        placeholder="Date (YYYY-MM-DD)"
        @update:modelValue="onFilterChange"
        showClear
      />
      <PrimeInputNumber
        v-model="filterDepth"
        placeholder="Max depth (m)"
        :minFractionDigits="1"
        :min="0"
        @input="onDepthChange"
        showClear
      />
      <PrimeInputNumber
        v-model="filterDuration"
        placeholder="Duration (min)"
        :min="0"
        @input="onDurationChange"
        showClear
      />
    </div>

    <PrimeColumn
      field="divingEnvironment.label"
      header="Environment"
      :sortable="true"
    />
    <PrimeColumn field="date" header="Date" :sortable="true">
      <template #body="{ data }">
        {{ data.date ? new Date(data.date).toLocaleDateString() : "N/A" }}
      </template>
    </PrimeColumn>
    <PrimeColumn field="maxDepth" header="Depth" :sortable="true">
      <template #body="{ data }">
        {{ data.maxDepth !== undefined ? `${data.maxDepth} meters` : "N/A" }}
      </template>
    </PrimeColumn>
    <PrimeColumn field="totalTime" header="Duration" :sortable="true">
      <template #body="{ data }">
        {{ data.totalTime !== undefined ? `${data.totalTime} minutes` : "N/A" }}
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>

<style scoped lang="scss"></style>
