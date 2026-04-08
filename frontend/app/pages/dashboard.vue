<script setup lang="ts">
import { formatDate } from "date-fns";
import { Avatar } from "primevue";
import Chart from "primevue/chart";
import { CALL_ONCE_STATS, useDiveStore } from "~/stores/dive";
import { useUserStore } from "~/stores/user";

// ─── Meta ─────────────────────────────────────────────────────────────────────
definePageMeta({ middleware: "auth" });
useHead({ title: "Dashboard — DiveLog" });

// ─── Store ────────────────────────────────────────────────────────────────────
const diveStore = useDiveStore();
const userStore = useUserStore();

/**
 * Même si l'utilisateur navigue entre /dashboard et /dives et revient,
 * ces fetches se redéclenchent pour garantir des données à jour.
 */
await callOnce(CALL_ONCE_STATS, () => diveStore.fetchStats());

const user = computed(() => userStore.user);
const stats = computed(() => diveStore.stats);

// Helpers to format durations
const formatDuration = (minutes: number | null | undefined) => {
  if (!minutes) return "0 min";
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  return h > 0 ? `${h}h${m.toString().padStart(2, "0")}` : `${m} min`;
};

const chartOptions = {
  plugins: {
    legend: { labels: { color: "#ffffff" } },
  },
};

const barChartOptions = {
  ...chartOptions,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: "#a0a0ab" },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
    y: {
      ticks: { color: "#a0a0ab" },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
  },
};

// Charts Data
const rolesChartData = computed(() => {
  if (!stats.value?.divesOverRoles || stats.value.divesOverRoles.length === 0)
    return null;
  return {
    labels: stats.value.divesOverRoles.map((r: any) => r.name),
    datasets: [
      {
        data: stats.value.divesOverRoles.map((r: any) => r.count),
        backgroundColor: [
          "#4ade80",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
      },
    ],
  };
});

const envsChartData = computed(() => {
  if (
    !stats.value?.divesOverEnvironments ||
    stats.value.divesOverEnvironments.length === 0
  )
    return null;
  return {
    labels: stats.value.divesOverEnvironments.map((r: any) => r.name),
    datasets: [
      {
        data: stats.value.divesOverEnvironments.map((r: any) => r.count),
        backgroundColor: [
          "#06b6d4",
          "#8b5cf6",
          "#ec4899",
          "#f97316",
          "#eab308",
        ],
      },
    ],
  };
});

const typesChartData = computed(() => {
  if (!stats.value?.divesOverTypes || stats.value.divesOverTypes.length === 0)
    return null;
  return {
    labels: stats.value.divesOverTypes.map((r: any) => r.name),
    datasets: [
      {
        label: "Number",
        data: stats.value.divesOverTypes.map((r: any) => r.count),
        backgroundColor: "#3b82f6",
      },
    ],
  };
});
</script>

<template>
  <div class="page-dashboard">
    <header>
      <div>
        <h1>{{ $t("pages.dashboard.title") }}</h1>
      </div>
      <Card>
        <template #content>
          <div class="page-dashboard__profile-content">
            <Avatar
              :image="getAvatarUrl(user?.avatar)"
              :label="
                !user?.avatar
                  ? user?.username?.charAt(0).toUpperCase()
                  : undefined
              "
              size="xlarge"
              shape="circle"
            />
            <div>
              <h2>{{ user?.username }}</h2>
              <p>
                {{ $t("pages.dashboard.numberOfDives") }} :
                <span>{{ stats?.numberOfDives || 0 }}</span>
              </p>
            </div>
          </div>
        </template>
      </Card>
    </header>

    <section>
      <h2>{{ $t("pages.dashboard.durations.title") }}</h2>
      <div class="page-dashboard__grid">
        <Card>
          <template #title
            ><span>{{
              $t("pages.dashboard.durations.totalTime")
            }}</span></template
          >
          <template #content>
            <div>{{ formatDuration(stats?.totalImmersedTimeInMinutes) }}</div>
          </template>
        </Card>
        <Card>
          <template #title
            ><span>{{
              $t("pages.dashboard.durations.averageTime")
            }}</span></template
          >
          <template #content>
            <div>
              {{
                formatDuration(
                  (stats?.totalImmersedTimeInMinutes || 0) /
                    (stats?.numberOfDives || 1),
                )
              }}
            </div>
          </template>
        </Card>
        <Card>
          <template #title
            ><span>{{
              $t("pages.dashboard.durations.shortestDive")
            }}</span></template
          >
          <template #content>
            <div>{{ formatDuration(stats?.shortestDiveTime) }}</div>
          </template>
        </Card>
        <Card>
          <template #title
            ><span>{{
              $t("pages.dashboard.durations.top5Longest")
            }}</span></template
          >
          <template #content>
            <ul>
              <li
                v-for="(dive, idx) in stats?.top5LongestDives || []"
                :key="dive.id"
              >
                <span
                  >{{ Number(idx) + 1 }}.
                  {{ formatDate(dive.date, "dd/MM/yyyy") + " " }}</span
                >
                <span>{{ formatDuration(dive.totalTime) }}</span>
              </li>
              <li v-if="!stats?.top5LongestDives?.length">Aucune donnée</li>
            </ul>
          </template>
        </Card>
      </div>
    </section>

    <div class="page-dashboard__split">
      <section>
        <h2>{{ $t("pages.dashboard.depths.title") }}</h2>
        <div class="page-dashboard__grid">
          <Card>
            <template #title
              ><span>{{
                $t("pages.dashboard.depths.top5Deepest")
              }}</span></template
            >
            <template #content>
              <ul>
                <li
                  v-for="(dive, idx) in stats?.top5DeepestDives || []"
                  :key="dive.id"
                >
                  <span
                    >{{ Number(idx) + 1 }}.
                    {{ formatDate(dive.date, "dd/MM/yyyy") + " " }}</span
                  >
                  <span>{{ dive.maxDepth }}m</span>
                </li>
                <li v-if="!stats?.top5DeepestDives?.length">
                  {{ $t("common.noData") }}
                </li>
              </ul>
            </template>
          </Card>
        </div>
      </section>

      <section>
        <h2>{{ $t("pages.dashboard.consumption.title") }}</h2>
        <div class="page-dashboard__grid">
          <Card>
            <template #title
              ><span>{{
                $t("pages.dashboard.consumption.stats")
              }}</span></template
            >
            <template #content>
              <div class="consumption-list">
                <div class="consumption-item">
                  <span>{{
                    $t("pages.dashboard.consumption.multiTanks") + " "
                  }}</span>
                  <span>{{ stats?.multiTanksDivesCount || 0 }}</span>
                </div>
                <div class="consumption-item">
                  <span>{{
                    $t("pages.dashboard.consumption.averageConsumption") + " "
                  }}</span>
                  <span>
                    {{
                      stats?.averageConsumptionBar
                        ? stats.averageConsumptionBar.toFixed(1) + " bar"
                        : "N/A"
                    }}
                  </span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </section>
    </div>

    <section>
      <h2>{{ $t("pages.dashboard.themes.title") }}</h2>
      <div class="page-dashboard__themes-grid">
        <Card>
          <template #title
            ><span>{{ $t("pages.dashboard.themes.roles") }}</span></template
          >
          <template #content>
            <div class="chart-container chart-container--pie">
              <Chart
                v-if="rolesChartData"
                type="pie"
                :data="rolesChartData"
                :options="chartOptions"
              />
              <p v-else>{{ $t("common.noData") }}</p>
            </div>
          </template>
        </Card>
        <Card>
          <template #title
            ><span>{{
              $t("pages.dashboard.themes.environments")
            }}</span></template
          >
          <template #content>
            <div class="chart-container chart-container--pie">
              <Chart
                v-if="envsChartData"
                type="pie"
                :data="envsChartData"
                :options="chartOptions"
              />
              <p v-else>{{ $t("common.noData") }}</p>
            </div>
          </template>
        </Card>
        <Card>
          <template #title
            ><span>{{ $t("pages.dashboard.themes.types") }}</span></template
          >
          <template #content>
            <div class="chart-container chart-container--bar">
              <Chart
                v-if="typesChartData"
                type="bar"
                :data="typesChartData"
                :options="barChartOptions"
              />
              <p v-else>{{ $t("common.noData") }}</p>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page-dashboard {
  max-width: 1400px;
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  &__header {
    &-top {
      margin-bottom: 1.5rem;
      h1 {
        margin: 0;
        font-size: 2.25rem;
        font-weight: 700;
        color: var(--p-text-color);
      }
    }
  }

  &__profile {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    &-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    &-info {
      h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
      }
      p {
        margin: 0;
        color: var(--p-text-muted-color);
        font-size: 1.1rem;
        span {
          font-weight: bold;
          color: var(--p-primary-color);
        }
      }
    }
  }

  section {
    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--p-text-color);
      border-bottom: 2px solid var(--p-content-border-color);
      padding-bottom: 0.5rem;
    }
  }

  &__split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
    align-items: stretch;

    > section {
      display: flex;
      flex-direction: column;
      height: 100%;

      .page-dashboard__grid {
        flex: 1;
      }
    }
  }

  &__grid,
  &__themes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  :deep(.p-card) {
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--p-content-border-color);

        &:last-child {
          border-bottom: none;
        }

        span:first-child {
          color: var(--p-text-muted-color);
        }

        span:last-child {
          font-weight: 600;
          color: var(--p-text-color);
        }
      }
    }
  }

  .consumption-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .consumption-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--p-content-border-color);

    &:last-child {
      border-bottom: none;
    }

    span:first-child {
      color: var(--p-text-muted-color);
    }

    span:last-child {
      font-weight: 600;
      color: var(--p-text-color);
    }
  }

  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &--pie {
      max-width: 250px;
      margin: 0 auto;
    }

    &--bar {
      max-width: 100%;
      height: 300px;
      position: relative;
    }
  }
}
</style>
