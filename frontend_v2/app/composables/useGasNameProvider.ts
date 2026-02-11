const translations = {
  GAS: {
    GAS_MIX: 'Gas Mix',
    OXYGEN: 'Oxygen',
    NITROGEN: 'Nitrogen',
    HELIUM: 'Helium',
    AIR: 'Air',
    NITROX: 'Nitrox',
    TRIMIX: 'Trimix',
    TRIMIX_NORMOX: 'Trimix Normox.',
    TRIMIX_HYPEROX: 'Trimix Hyperox. (Triox)',
    TRIMIX_HYPOX: 'Trimix Hypox.',
    NORMOXIC: 'Normoxic',
    HYPEROXIC: 'Hyperoxic',
    HYPOXIC: 'Hypoxic',
    HELIOX: 'Heliox',
    UNBREATHABLE: 'Unbreathable gas',
    PRESSURE_START: 'Start pressure (in. bar)',
    PRESSURE_END: 'End pressure (in. bar)',
    LOCK_GAS: 'Lock Gas',
    CURRENT_GAS: 'Current Gas:',
  },
} as const

const {
  OXYGEN,
  AIR,
  NITROX,
  TRIMIX,
  HYPOXIC,
  NORMOXIC,
  HYPEROXIC,
  HELIOX,
  UNBREATHABLE,
} = translations.GAS

interface GasName {
  title: string
  subtitle: string
  breathable: boolean
}

/**
 * Composable pour déterminer le nom et les propriétés d'un mélange gazeux
 * @param mix - Le mélange gazeux (peut être une ref, getter ou valeur)
 * @returns Les propriétés calculées du gaz
 */
export function useGasNameProvider(mix: MaybeRefOrGetter<GasMix>) {
  // Helpers pour vérifier les types de gaz
  const isPureOxygen = (gasMix: GasMix): boolean => gasMix.oxygen === 100

  const isPureInert = (gasMix: GasMix): boolean =>
    gasMix.nitrogen === 100 || gasMix.helium === 100

  const isAir = (gasMix: GasMix): boolean =>
    gasMix.oxygen === 21 && gasMix.nitrogen === 79

  const isNitrox = (gasMix: GasMix): boolean =>
    gasMix.oxygen > 21 &&
    gasMix.oxygen < 100 &&
    gasMix.nitrogen < 79 &&
    gasMix.nitrogen > 0 &&
    gasMix.helium === 0

  const isHeliox = (gasMix: GasMix): boolean =>
    gasMix.oxygen > 0 && gasMix.helium > 0 && gasMix.nitrogen === 0

  const isTrimix = (gasMix: GasMix): boolean =>
    gasMix.oxygen > 0 && gasMix.helium > 0 && gasMix.nitrogen > 0

  const isNormoxicTrimix = (gasMix: GasMix): boolean =>
    isTrimix(gasMix) && gasMix.oxygen > 17 && gasMix.oxygen < 22

  const isHyperoxicTrimix = (gasMix: GasMix): boolean =>
    isTrimix(gasMix) && gasMix.oxygen > 21

  const isHypoxicTrimix = (gasMix: GasMix): boolean =>
    isTrimix(gasMix) && gasMix.oxygen < 18 && gasMix.oxygen > 1

  // Computed pour calculer le nom du gaz
  const gasName = computed<GasName>(() => {
    const gasMix = toValue(mix)

    // Pure Oxygen
    if (isPureOxygen(gasMix)) {
      return {
        title: OXYGEN,
        subtitle: '',
        breathable: true,
      }
    }

    // Pure Inert (non respirable)
    if (isPureInert(gasMix)) {
      return {
        title: UNBREATHABLE,
        subtitle: '',
        breathable: false,
      }
    }

    // Air
    if (isAir(gasMix)) {
      return {
        title: AIR,
        subtitle: '',
        breathable: true,
      }
    }

    // Nitrox
    if (isNitrox(gasMix)) {
      return {
        title: NITROX,
        subtitle: `(${gasMix.oxygen})`,
        breathable: true,
      }
    }

    // Heliox
    if (isHeliox(gasMix)) {
      return {
        title: HELIOX,
        subtitle: `(${gasMix.oxygen})`,
        breathable: true,
      }
    }

    // Trimix Normoxic
    if (isNormoxicTrimix(gasMix)) {
      return {
        title: TRIMIX,
        subtitle: `${NORMOXIC} (${gasMix.oxygen}/${gasMix.helium})`,
        breathable: true,
      }
    }

    // Trimix Hyperoxic
    if (isHyperoxicTrimix(gasMix)) {
      return {
        title: TRIMIX,
        subtitle: `${HYPEROXIC} (${gasMix.oxygen}/${gasMix.helium})`,
        breathable: true,
      }
    }

    // Trimix Hypoxic
    if (isHypoxicTrimix(gasMix)) {
      return {
        title: TRIMIX,
        subtitle: `${HYPOXIC} (${gasMix.oxygen}/${gasMix.helium})`,
        breathable: true,
      }
    }

    // Unbreathable par défaut
    return {
      title: UNBREATHABLE,
      subtitle: '',
      breathable: false,
    }
  })

  // Computed individuels pour un accès facile
  const title = computed(() => gasName.value.title)
  const subtitle = computed(() => gasName.value.subtitle)
  const breathable = computed(() => gasName.value.breathable)

  return {
    gasName,
    title,
    subtitle,
    breathable,
  }
}


// // Le composable accepte une ref, un getter ou une valeur
// const { gasName, title, subtitle, breathable } = useGasNameProvider(gasMix)

// // Ou avec un getter
// const { gasName: computedGasName } = useGasNameProvider(() => ({
//   oxygen: 32,
//   nitrogen: 68,
//   helium: 0,
// }))
// </script>

// <template>
//   <div>
//     <h2>{{ title }}</h2>
//     <p v-if="subtitle">{{ subtitle }}</p>
//     <p :class="{ 'text-red': !breathable }">
//       {{ breathable ? 'Respirable' : 'Non respirable' }}
//     </p>
//   </div>
// </template>