import { 
  divesControllerFindAll, 
  divesControllerCreate, 
  divesControllerUpdate, 
  divesControllerRemove 
} from '~/composables/api/generated/dives/dives'
import { statsControllerGetMyStats } from '~/composables/api/generated/stats/stats'
import type { HeatmapValue } from '~/types/components/HeatmapValue'
import { useUserStore } from '~/stores/user'
import type { CreateDiveDto, Dive, DiveCountDto, UpdateDiveDto, UserStats } from '~/composables/api/generated/model'

export async function fetchHeatmapYear(year: number): Promise<HeatmapValue[]> {
  const userStore = useUserStore()
  const userId = userStore.user?.id?.toString()
  if(!userId) return [];
  const response = await divesControllerFindAll({ userId, year, limit:999999 })  
  const dives = response?.data?.dives || []
  
  const map = new Map<string, number>()
  for (const dive of dives) {
    if (!dive.date) continue;    
    // Extract YYYY-MM-DD
    const dateStr = dive.date.split('T')[0]
    if (!dateStr) continue;
    if (dateStr.startsWith(year.toString())) {
      map.set(dateStr, (map.get(dateStr) ?? 0) + 1)
    }
  }

  return [...map.entries()].map(([date, count]) => ({ date, count }))
}

export interface ListFilters {
  date?: string
  maxDepth?: number
  totalTime?: number
  divingEnvironment?: string
}

export async function fetchList(limit: number = 10, offset: number = 0, filters: ListFilters = {}): Promise<Dive[]> {
  const userStore = useUserStore()
  const userId = userStore.user?.id?.toString()
  if(!userId) return [];

  const response = await divesControllerFindAll({ userId, limit, offset, ...filters })
 
  return response?.data?.dives || []  
}

export async function fetchStats(): Promise<UserStats> {
  const response = await statsControllerGetMyStats()
  return response?.data
}

export async function addDive(payload: CreateDiveDto): Promise<Dive> {
  const response = await divesControllerCreate(payload)
  return response?.data!
}

export async function updateDive(id: string | number, payload: UpdateDiveDto): Promise<Dive> {
  const response = await divesControllerUpdate(Number(id), payload)
  return response?.data!
}

export async function deleteDive(id: string | number): Promise<void> {
  await divesControllerRemove(Number(id))
}
