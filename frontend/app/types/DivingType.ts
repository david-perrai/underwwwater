import type { CreateDiveDtoDiverRole } from "~/composables/api/generated/model";

export interface DivingRoles {
  id: CreateDiveDtoDiverRole;
  label: string;
}

export const DIVING_ROLES: DivingRoles[] = [
  { id: "diver", label: "Diver" },
  { id: "instructor", label: "Instructor" },
  { id: "monitor", label: "Monitor" },
];
