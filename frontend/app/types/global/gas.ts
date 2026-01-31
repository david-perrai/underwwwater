export enum GasNames {
  OXYGEN = "oxygen",
  NITROGEN = "nitrogen",
  HELIUM = "helium",
}

export const GAS_LIST = [GasNames.OXYGEN, GasNames.NITROGEN, GasNames.HELIUM];

export interface GasMix {
  helium: number;
  oxygen: number;
  nitrogen: number;
}

export interface GasTank {
  gasMix: GasMix;
  pressureStart: number;
  pressureEnd: number;
  [key: string]: any;
}
