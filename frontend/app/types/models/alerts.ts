export interface AlertInterface {
  type?: "error" | "success" | "warning" | "info" | undefined;
  message: string;
}
