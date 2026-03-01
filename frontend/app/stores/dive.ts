import type { Dive, DiveCreate, DiveUpdate, DashboardStats, HeatmapValue } from '~/types/dive'

// ─── 🔀 Swap mock → vraie API ici quand l'API sera prête ─────────────────────
// import * as diveApi from '~/api/dive'
import * as diveApi from '~/mocks/diveApi'
// ─────────────────────────────────────────────────────────────────────────────

// ─── Clés callOnce ────────────────────────────────────────────────────────────
export const CALL_ONCE_HEATMAP = (year: number) => `dive:heatmap:${year}`
export const CALL_ONCE_LIST    = 'dive:list'
export const CALL_ONCE_STATS   = 'dive:stats'

export const useDiveStore = defineStore('dive', () => {

  // ── Heatmap ─────────────────────────────────────────────────────────────────
  const heatmapCache    = ref<Map<number, HeatmapValue[]>>(new Map())
  const heatmapLoading  = ref(false)
  const heatmapError    = ref<string | null>(null)

  function isYearCached(year: number): boolean {
    return heatmapCache.value.has(year)
  }

  function getHeatmapYear(year: number): HeatmapValue[] {
    return heatmapCache.value.get(year) ?? []
  }

  async function fetchHeatmapYear(year: number): Promise<void> {
    if (isYearCached(year)) return

    heatmapLoading.value = true
    heatmapError.value   = null

    try {
      const data = await diveApi.fetchHeatmapYear(year)
      heatmapCache.value = new Map(heatmapCache.value).set(year, data)
    }
    catch (err: any) {
      heatmapError.value = err?.data?.message ?? err?.message ?? 'Erreur inconnue'
    }
    finally {
      heatmapLoading.value = false
    }
  }

  // ── Liste ────────────────────────────────────────────────────────────────────
  const list         = ref<Dive[]>([])
  const listFetched  = ref(false)
  const listLoading  = ref(false)
  const listError    = ref<string | null>(null)

  async function fetchList(): Promise<void> {
    if (listFetched.value) return

    listLoading.value = true
    listError.value   = null

    try {
      list.value        = await diveApi.fetchList()
      listFetched.value = true
    }
    catch (err: any) {
      listError.value = err?.data?.message ?? err?.message ?? 'Erreur inconnue'
    }
    finally {
      listLoading.value = false
    }
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  const stats         = ref<DashboardStats | null>(null)
  const statsFetched  = ref(false)
  const statsLoading  = ref(false)
  const statsError    = ref<string | null>(null)

  async function fetchStats(): Promise<void> {
    if (statsFetched.value) return

    statsLoading.value = true
    statsError.value   = null

    try {
      stats.value        = await diveApi.fetchStats()
      statsFetched.value = true
    }
    catch (err: any) {
      statsError.value = err?.data?.message ?? err?.message ?? 'Erreur inconnue'
    }
    finally {
      statsLoading.value = false
    }
  }

  // ── Mutations ────────────────────────────────────────────────────────────────
  async function addDive(payload: DiveCreate): Promise<Dive> {
    const created = await diveApi.addDive(payload)
    invalidate()
    return created
  }

  async function updateDive(id: string, payload: DiveUpdate): Promise<Dive> {
    const updated = await diveApi.updateDive(id, payload)
    invalidate()
    return updated
  }

  async function deleteDive(id: string): Promise<void> {
    await diveApi.deleteDive(id)
    invalidate()
  }

  // ── Invalidation ─────────────────────────────────────────────────────────────
  function invalidate(): void {
    heatmapCache.value  = new Map()
    heatmapError.value  = null
    list.value          = []
    listFetched.value   = false
    listError.value     = null
    stats.value         = null
    statsFetched.value  = false
    statsError.value    = null
  }

  return {
    heatmapCache, heatmapLoading, heatmapError,
    isYearCached, getHeatmapYear, fetchHeatmapYear,
    list, listLoading, listFetched, listError, fetchList,
    stats, statsLoading, statsFetched, statsError, fetchStats,
    addDive, updateDive, deleteDive,
    invalidate,
  }
})