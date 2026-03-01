/**
 * mocks/diveApi.ts
 *
 * Fausses implémentations de l'API dives.
 * Même signatures que la future vraie API → swap en une ligne d'import.
 *
 * Pour basculer sur la vraie API dans stores/dive.ts, remplacer :
 *   import { fetchHeatmapYear, fetchList, fetchStats, ... } from '~/mocks/diveApi'
 * par :
 *   import { fetchHeatmapYear, fetchList, fetchStats, ... } from '~/api/dive'
 */

import type { Dive, DiveCreate, DiveUpdate, DashboardStats, HeatmapValue } from '~/types/dive'

// ─── Utilitaires internes ─────────────────────────────────────────────────────

/** Simule la latence réseau (100–350 ms) */
function delay(ms = 150 + Math.random() * 200): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** Nombre entier aléatoire entre min et max inclus */
function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Choisit un élément aléatoire dans un tableau */
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Formate une Date en "YYYY-MM-DD" */
function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// ─── Données de référence ─────────────────────────────────────────────────────

const LOCATIONS = [
  'Méditerranée', 'Atlantique', 'Mer Rouge', 'Océan Indien',
  'Mer des Caraïbes', 'Manche', 'Mer Adriatique',
]

const SITES: Record<string, string[]> = {
  'Méditerranée':     ['Calanque de Morgiou', 'Île de Riou', 'Cap Sicié', 'Épave Liban'],
  'Atlantique':       ['Île de Groix', 'Belle-Île', 'Pointe du Raz', 'Côte Sauvage'],
  'Mer Rouge':        ['Ras Mohammed', 'The Blue Hole', 'SS Thistlegorm', 'Gordon Reef'],
  'Océan Indien':     ['Grande Barrière', 'Aldabra', 'Mayotte Passe en S'],
  'Mer des Caraïbes': ['Blue Hole Belize', 'Palancar Reef', 'Bloody Bay Wall'],
  'Manche':           ['Épave Hampshire', 'Raz Blanchard', 'Jersey Breakwater'],
  'Mer Adriatique':   ['Blue Cave Vis', 'Biševo', 'Mjet National Park'],
}

const TYPES = ['recreational', 'technical', 'freediving', 'cave', 'wreck'] as const
const BUDDIES = ['Alice', 'Bob', 'Clara', 'David', 'Emma', 'François', 'Giulia', null]

// ─── Générateur de plongées ───────────────────────────────────────────────────

let _idCounter = 1

function makeDive(date: string): Dive {
  const location = pick(LOCATIONS)
  const sites    = SITES[location] ?? ['Site inconnu']
  return {
    id:        String(_idCounter++),
    date,
    location,
    site:      pick(sites),
    depth:     rand(8, 42),
    duration:  rand(25, 75),
    type:      pick(TYPES),
    notes:     Math.random() > 0.6 ? 'Belle visibilité, courant modéré.' : undefined,
    buddy:     pick(BUDDIES) ?? undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Génère entre 35 et 45 dates de plongée réparties sur l'année `year`.
 * Certaines dates peuvent avoir 2–4 plongées (même jour).
 */
function generateDivesForYear(year: number): Dive[] {
  const isCurrentYear = year === new Date().getFullYear()
  const lastDay       = isCurrentYear
    ? new Date()
    : new Date(year, 11, 31)

  // ~40 "sessions" par an, chaque session peut avoir 1-4 plongées
  const sessionCount = rand(35, 45)
  const totalDays    = Math.floor((lastDay.getTime() - new Date(year, 0, 1).getTime()) / 86_400_000)

  // Génère des offsets de jours uniques et triés
  const offsets = new Set<number>()
  while (offsets.size < sessionCount) {
    offsets.add(rand(0, totalDays))
  }

  const dives: Dive[] = []
  for (const offset of [...offsets].sort((a, b) => a - b)) {
    const d         = new Date(year, 0, 1 + offset)
    const dateStr   = toISO(d)
    const perDay    = rand(1, 4) // 1 à 4 plongées dans la journée
    for (let i = 0; i < perDay; i++) dives.push(makeDive(dateStr))
  }

  return dives
}

// ─── Cache interne du mock (évite de regénérer à chaque appel) ────────────────
const _diveCache = new Map<number, Dive[]>()

function getDivesForYear(year: number): Dive[] {
  if (!_diveCache.has(year)) _diveCache.set(year, generateDivesForYear(year))
  return _diveCache.get(year)!
}

// ─── API publique (même signatures que la vraie API) ─────────────────────────

/**
 * GET /api/dives/heatmap?year=YYYY
 * Retourne les dates + counts agrégés par jour pour l'année donnée.
 */
export async function fetchHeatmapYear(year: number): Promise<HeatmapValue[]> {
  await delay()

  const dives = getDivesForYear(year)

  // Agrège les plongées par date
  const map = new Map<string, number>()
  for (const dive of dives) {
    map.set(dive.date, (map.get(dive.date) ?? 0) + 1)
  }

  return [...map.entries()].map(([date, count]) => ({ date, count }))
}

/**
 * GET /api/dives
 * Retourne toutes les plongées des 3 dernières années.
 */
export async function fetchList(): Promise<Dive[]> {
  await delay()

  const currentYear = new Date().getFullYear()
  return [
    ...getDivesForYear(currentYear),
    ...getDivesForYear(currentYear - 1),
    ...getDivesForYear(currentYear - 2),
  ].sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * GET /api/dives/stats
 * Retourne les statistiques agrégées pour le dashboard.
 */
export async function fetchStats(): Promise<DashboardStats> {
  await delay()

  const currentYear = new Date().getFullYear()
  const allDives    = [
    ...getDivesForYear(currentYear),
    ...getDivesForYear(currentYear - 1),
    ...getDivesForYear(currentYear - 2),
  ]

  const totalDives    = allDives.length
  const totalDepth    = allDives.reduce((s, d) => s + d.depth, 0)
  const totalDuration = allDives.reduce((s, d) => s + d.duration, 0)
  const maxDepthDive  = allDives.reduce((best, d) => d.depth > best.depth ? d : best, allDives[0])
  const longestDive   = allDives.reduce((best, d) => d.duration > best.duration ? d : best, allDives[0])

  const divesByType = allDives.reduce((acc, d) => {
    acc[d.type] = (acc[d.type] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  const monthMap = new Map<string, number>()
  for (const d of allDives) {
    const key = d.date.slice(0, 7) // "YYYY-MM"
    monthMap.set(key, (monthMap.get(key) ?? 0) + 1)
  }
  const divesByMonth = [...monthMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }))

  const locationMap = new Map<string, number>()
  for (const d of allDives) locationMap.set(d.location, (locationMap.get(d.location) ?? 0) + 1)
  const divesByLocation = [...locationMap.entries()]
    .sort(([, a], [, b]) => b - a)
    .map(([location, count]) => ({ location, count }))

  return {
    totalDives,
    totalDepth,
    totalDuration,
    avgDepth:     Math.round((totalDepth / totalDives) * 10) / 10,
    avgDuration:  Math.round(totalDuration / totalDives),
    maxDepth:     maxDepthDive.depth,
    deepestDive:  { id: maxDepthDive.id, date: maxDepthDive.date, site: maxDepthDive.site, depth: maxDepthDive.depth },
    longestDive:  { id: longestDive.id,  date: longestDive.date,  site: longestDive.site,  duration: longestDive.duration },
    divesByType:  divesByType as any,
    divesByMonth,
    divesByLocation,
  }
}

/**
 * POST /api/dives
 */
export async function addDive(payload: DiveCreate): Promise<Dive> {
  await delay()
  const dive = { ...payload, id: String(_idCounter++), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  const year = new Date(payload.date).getFullYear()
  getDivesForYear(year).push(dive)
  return dive
}

/**
 * PATCH /api/dives/:id
 */
export async function updateDive(id: string, payload: DiveUpdate): Promise<Dive> {
  await delay()
  const currentYear = new Date().getFullYear()
  for (const y of [currentYear, currentYear - 1, currentYear - 2]) {
    const dives = getDivesForYear(y)
    const idx   = dives.findIndex(d => d.id === id)
    if (idx !== -1) {
      dives[idx] = { ...dives[idx], ...payload, updatedAt: new Date().toISOString() }
      return dives[idx]
    }
  }
  throw new Error(`Dive ${id} not found`)
}

/**
 * DELETE /api/dives/:id
 */
export async function deleteDive(id: string): Promise<void> {
  await delay()
  const currentYear = new Date().getFullYear()
  for (const y of [currentYear, currentYear - 1, currentYear - 2]) {
    const dives = getDivesForYear(y)
    const idx   = dives.findIndex(d => d.id === id)
    if (idx !== -1) { dives.splice(idx, 1); return }
  }
}