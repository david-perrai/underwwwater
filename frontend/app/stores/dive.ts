import type { Dive, CreateDiveDto, UpdateDiveDto } from '~/composables/api/generated/model'
import type { HeatmapValue } from '~/types/components/HeatmapValue'

import * as diveApi from '~/composables/api/dive'


// ─── Clés callOnce ────────────────────────────────────────────────────────────
export const CALL_ONCE_HEATMAP = (year: number) => `dive:heatmap:${year}`
export const CALL_ONCE_LIST    = 'dive:list'
export const CALL_ONCE_STATS   = 'dive:stats'

export const useDiveStore = defineStore('dive', () => {

  // ── Heatmap ─────────────────────────────────────────────────────────────────
  const heatmapData     = ref<Map<number, HeatmapValue[]>>(new Map())
  const heatmapLoading  = ref(false)
  const heatmapError    = ref<string | null>(null)

  function getHeatmapYear(year: number): HeatmapValue[] {
    return heatmapData.value.get(year) ?? []
  }

  async function fetchHeatmapYear(year: number): Promise<void> {
    heatmapLoading.value = true
    heatmapError.value   = null

    try {
      const data = await diveApi.fetchHeatmapYear(year)
      heatmapData.value = new Map(heatmapData.value).set(year, data)
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
  const offset       = ref(0)
  const limit        = ref(10)
  const hasMore      = ref(true)

  // ── Filtres actifs ───────────────────────────────────────────────────────────
  const activeFilters = ref<diveApi.ListFilters>({})
  const filterKey     = ref(0)

  async function fetchList(): Promise<void> {    
        
    if (!hasMore.value || listLoading.value) return
    
    listLoading.value = true
    listError.value   = null

    try {
      const newDives = await diveApi.fetchList(limit.value, offset.value, activeFilters.value)
      
      if (newDives.length < limit.value) {
        hasMore.value = false
      }
      
      
      if(Object.values(activeFilters.value).length > 0 || offset.value === 0){
        list.value = [...newDives, ...list.value]
      }else{
        list.value.push(...newDives)
      }
      
      offset.value++
      listFetched.value = true
    }
    catch (err: any) {
      listError.value = err?.data?.message ?? err?.message ?? 'Erreur inconnue'
    }
    finally {
      listLoading.value = false
    }
  }

  /** Applique de nouveaux filtres : réinitialise la liste et laisse le DataTable déclencher le premier fetch via onLazyLoad */
  function applyFilters(filters: diveApi.ListFilters): void {    
    activeFilters.value = filters
    list.value          = []
    offset.value        = 0
    hasMore.value       = true
    listFetched.value   = false
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  const stats         = ref<any | null>(null)
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
  async function addDive(payload: CreateDiveDto): Promise<Dive> {
    const created = await diveApi.addDive(payload)
    invalidate()

    // Repull data to keep UI fresh
    const year = new Date().getFullYear()
    await Promise.all([
      fetchHeatmapYear(year),
      fetchHeatmapYear(year - 1),
      fetchList()
    ])
    
    return created
  }

  async function updateDive(id: string, payload: UpdateDiveDto): Promise<Dive> {
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
    heatmapData.value   = new Map()
    heatmapError.value  = null
    list.value          = []
    listFetched.value   = false
    listError.value     = null
    offset.value        = 0
    stats.value         = null
    statsFetched.value  = false
    statsError.value    = null
  }

  return {
    heatmapData, heatmapLoading, heatmapError,
    getHeatmapYear, fetchHeatmapYear,
    list, listLoading, listFetched, listError, activeFilters, filterKey, fetchList, applyFilters,
    stats, statsLoading, statsFetched, statsError, fetchStats,
    addDive, updateDive, deleteDive,
    invalidate, limit, offset, hasMore
  }
})