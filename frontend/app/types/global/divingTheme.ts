export interface DivingThemeEdgeInterface {
  node: DivingThemeInterface;
}
export interface DivingThemeInterface {
  readonly id?: string;
  label: string;
  token: string;
  edges?: {
    node?: DivingThemeInterface;
  }[];
}
