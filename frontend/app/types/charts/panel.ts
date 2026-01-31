import type { CalendarHighlightItem } from "./calendar";

interface PanelCol {
  title: string;
  subtitle: string[] | CalendarHighlightItem[];
  highlight?: boolean;
  dropdown?: boolean;
}

interface PanelRow {
  cols: PanelCol[];
}

export interface PanelData {
  rows: PanelRow[];
}
