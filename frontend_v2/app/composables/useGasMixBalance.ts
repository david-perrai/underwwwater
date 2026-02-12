import type { GasMix } from '~/types/GasMix';

export const useGasMixBalance = (initialMix?: Partial<GasMix>) => {
  /** State */
  const gasMix = reactive<GasMix>({
    oxygen: initialMix?.oxygen ?? 21,
    nitrogen: initialMix?.nitrogen ?? 79,
    helium: initialMix?.helium ?? 0
  });

  const isOxygenDisabled = ref(false);
  const isNitrogenDisabled = ref(false);
  const isHeliumDisabled = ref(true);

  /** Computeds */
  const totalSum = computed(() => {
    return Math.round((gasMix.oxygen + gasMix.nitrogen + gasMix.helium) * 100) / 100;
  });

  /** Methods */
  const updateGas = (target: keyof GasMix, newValue: number) => {
    const clampedValue = Math.max(0, Math.min(100, newValue));

    // Config for redistribution
    const gasConfig = [
      { id: 'oxygen', value: gasMix.oxygen, locked: isOxygenDisabled.value, setter: (v: number) => gasMix.oxygen = v },
      { id: 'nitrogen', value: gasMix.nitrogen, locked: isNitrogenDisabled.value, setter: (v: number) => gasMix.nitrogen = v },
      { id: 'helium', value: gasMix.helium, locked: isHeliumDisabled.value, setter: (v: number) => gasMix.helium = v }
    ];

    const targetIdx = gasConfig.findIndex(g => g.id === target);
    const targetGas = targetIdx !== -1 ? gasConfig[targetIdx] : null;

    if (!targetGas || targetGas.locked) return;

    const oldValue = targetGas.value;
    const delta = clampedValue - oldValue;
    if (Math.abs(delta) < 0.01) return;

    let remainingDelta = delta;
    const otherIndices = [(targetIdx + 1) % 3, (targetIdx + 2) % 3];

    for (const otherIdx of otherIndices) {
      const currentOther = gasConfig[otherIdx];
      if (!currentOther || currentOther.locked) continue;

      const available = delta > 0
        ? currentOther.value
        : 100 - currentOther.value;

      const change = Math.min(Math.abs(remainingDelta), available);

      if (delta > 0) {
        currentOther.setter(Math.round((currentOther.value - change) * 10) / 10);
        remainingDelta -= change;
      } else {
        currentOther.setter(Math.round((currentOther.value + change) * 10) / 10);
        remainingDelta += change;
      }

      if (Math.abs(remainingDelta) < 0.01) break;
    }

    targetGas.setter(Math.round((oldValue + (delta - remainingDelta)) * 10) / 10);
  };

  return {
    gasMix,
    isOxygenDisabled,
    isNitrogenDisabled,
    isHeliumDisabled,
    totalSum,
    updateGas
  };
};
