import {
  type DivingThemeEdgeInterface,
  type DivingThemeInterface,
} from "@/types/global/divingTheme";

import { type GasTank } from "@/types/global/gas";

export interface DiveInterface {
  id: number | null;
  date: Date | string;
  totalTime: number;
  maxDepth: number;
  gasTanks: GasTank[];
  divingType: {
    edges: DivingThemeEdgeInterface[];
  };
  divingEnvironment: DivingThemeInterface | null;
  divingRole: DivingThemeInterface | null;
  owner?: string;
}
