import type { PanelData } from "./panel";

export interface DateItem {
  date: string;
  count: number;
}

export interface CalendarHighlightItem {
  title: string;
  subtitle: number;
}

export interface CalendarData {
  heatmap: {
    items: DateItem[];
    endDate: Date;
    colors: string[];
  };
  panel: PanelData;
}
