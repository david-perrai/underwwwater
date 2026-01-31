import { GasMix } from "@/types/global/gas";

/**
 * Gas Color funny generator
 * @param {GasMix} mix {Gasmix}
 */
export function useGasColorGenerator(mix: GasMix) {
  function hexFragmentConvertor(color: number) {
    const hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHexConvertor(red: number, green: number, blue: number) {
    return (
      "#" +
      hexFragmentConvertor(red) +
      hexFragmentConvertor(green) +
      hexFragmentConvertor(blue)
    );
  }

  function percentToBase16Convertor(value: number): number {
    return Math.round((value * 255) / 100);
  }

  return rgbToHexConvertor(
    percentToBase16Convertor(mix.helium),
    percentToBase16Convertor(mix.oxygen),
    percentToBase16Convertor(mix.nitrogen)
  );
}
