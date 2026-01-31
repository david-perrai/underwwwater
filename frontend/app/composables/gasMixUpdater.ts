import { GAS_LIST, GasMix } from "@/types/global/gas";

const MINIMUM_SUM_GAS = 0;
const MAXIMUM_SUM_GAS = 100;

/**
 * Gas Mix Updater function
 * @param {GasMix} newMix {GasMix}
 * @param {string} modifiedGas {string}
 * @param {string} lockedGas {string}
 * @return {GasMix} mix {GasMix}
 */
export function useGasMixUpdater(
  newMix: GasMix,
  modifiedGas: string,
  lockedGas: string
): GasMix {
  /**
   * Validate expected values (verify that number is between 0 and 100)
   * @return {GasMix}
   */
  function validateExpectedValues(): GasMix {
    for (const gasProp in newMix) {
      if (newMix[gasProp as keyof typeof newMix] > MAXIMUM_SUM_GAS) {
        newMix[gasProp as keyof typeof newMix] = MAXIMUM_SUM_GAS;
      }

      if (newMix[gasProp as keyof typeof newMix] < MINIMUM_SUM_GAS) {
        newMix[gasProp as keyof typeof newMix] = MINIMUM_SUM_GAS;
      }
    }

    return newMix;
  }

  /**
   * Get Delta of Gasmix
   * @return {number}
   */
  function getDeltaOfGasMix(): number {
    let delta = 0;

    for (const gasProp in newMix) {
      delta += newMix[gasProp as keyof typeof newMix];
    }

    return delta - MAXIMUM_SUM_GAS;
  }

  /**
   * Get the Gas To Equalize
   * @param {string} modifiedGas {string}
   * @param {string} lockedGas {string}
   * @param {number} operationToEqualize {number}
   * @param {GasMix} mix {GasMix}
   * @return {string}
   */
  function getGasToEqualize(
    modifiedGas: string,
    lockedGas: string,
    operationToEqualize: number,
    mix: GasMix
  ): string {
    const [thirdGas] = GAS_LIST.filter(
      (gasName) => gasName !== lockedGas && gasName !== modifiedGas
    );

    if (
      mix[thirdGas as keyof typeof mix] + operationToEqualize <
        MINIMUM_SUM_GAS ||
      mix[thirdGas as keyof typeof mix] + operationToEqualize > MAXIMUM_SUM_GAS
    ) {
      return modifiedGas;
    }

    return thirdGas;
  }

  /**
   * Update Gas Mix method
   * @return {GasMix | undefined}
   */
  function updateGasMix(): GasMix {
    newMix = validateExpectedValues();
    let delta = getDeltaOfGasMix();

    while (delta !== 0) {
      const operationToEqualize = Math.sign(-delta);
      const gasToEqualize = getGasToEqualize(
        modifiedGas,
        lockedGas,
        operationToEqualize,
        newMix
      );

      newMix[gasToEqualize as keyof typeof newMix] += operationToEqualize;
      delta = delta + operationToEqualize;
    }

    return newMix;
  }

  return updateGasMix();
}
