export interface Button {
  label?: string;
  icon?: string;
  iconPos?: "left" | "right" | "top" | "bottom";
  badge?: string;
  badgeSeverity?:
  | "secondary"
  | "success"
  | "info"
  | "warn"
  | "danger"
  | "contrast";
  loading?: boolean;
  loadingIcon?: string;
  link?: boolean;
  severity?: "secondary" | "success" | "info" | "warn" | "danger" | "contrast";
  raised?: boolean;
  rounded?: boolean;
  text?: boolean;
  outlined?: boolean;
  size?: "small" | "large";
  plain?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  // Props additionnelles
  to?: string | object;
  href?: string;
  target?: string;
  ariaLabel?: string;
}
