import type { ChartData } from "./globalChart";
import type { PanelData } from "./panel";

export interface DepthData {
  pie: ChartData;
  line: ChartData;
  panel: PanelData;
}
