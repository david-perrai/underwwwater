import type { ChartData } from "./globalChart";
import type { PanelData } from "./panel";

export interface GasConsumptionItem {
  startPressure: number;
  endPressure: number;
  pressure: number;
  label: string;
  barPerHour: number;
  date: string;
  tanks: number;
  totalTime: number;
}

export interface GasDoughnutItem {
  label: string;
  color: string;
  quantity: number;
}
export interface GasData {
  doughnut: ChartData;
  bar: ChartData;
  panel: PanelData;
}
