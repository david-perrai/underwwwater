import { GasMix } from "@/types/global/gas";
import { translations } from "@/i18n/index";

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
} = translations.en.GAS;

interface GasName {
  title: string;
  subtitle: string;
  breathable: boolean;
}

/**
 * Gas Name Label Provider
 * @param {GasMix} mix {Gasmix}
 * @return {GasName}
 */
export function useGasNameProvider(mix: GasMix): GasName {
  const gasName: GasName = {
    title: "",
    subtitle: "",
    breathable: true,
  };

  if (mix.oxygen === 100) {
    gasName.title = OXYGEN;
  } else if (mix.nitrogen === 100 || mix.helium === 100) {
    gasName.title = UNBREATHABLE;
    gasName.breathable = false;
  } else if (mix.oxygen === 21 && mix.nitrogen === 79) {
    gasName.title = AIR;
  } else if (
    mix.oxygen > 21 &&
    mix.oxygen < 100 &&
    mix.nitrogen < 79 &&
    mix.nitrogen > 0 &&
    mix.helium === 0
  ) {
    gasName.title = NITROX;
    gasName.subtitle = "(" + mix.oxygen + ")";
  } else if (mix.oxygen > 0 && mix.helium > 0 && mix.nitrogen === 0) {
    gasName.title = HELIOX;
    gasName.subtitle = "(" + mix.oxygen + ")";
  } else if (
    mix.oxygen > 17 &&
    mix.oxygen < 22 &&
    mix.helium > 0 &&
    mix.nitrogen > 0
  ) {
    gasName.title = TRIMIX;
    gasName.subtitle = NORMOXIC + "(" + mix.oxygen + "/" + mix.helium + ")";
  } else if (mix.oxygen > 21 && mix.helium > 0 && mix.nitrogen > 0) {
    gasName.title = TRIMIX;
    gasName.subtitle = HYPEROXIC + "(" + mix.oxygen + "/" + mix.helium + ")";
  } else if (
    mix.oxygen < 18 &&
    mix.oxygen > 1 &&
    mix.helium > 0 &&
    mix.nitrogen > 0
  ) {
    gasName.title = TRIMIX;
    gasName.subtitle = HYPOXIC + "(" + mix.oxygen + "/" + mix.helium + ")";
  } else {
    gasName.title = UNBREATHABLE;
    gasName.breathable = false;
  }
  return gasName;
}
