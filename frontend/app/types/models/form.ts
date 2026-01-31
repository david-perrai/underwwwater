import { GraphqlActions } from "@/types/models/graphql";

export interface Form {
  title: string;
  controls: FormControl[];
}

export interface FormControl {
  id: string;
  props: FormControlProps | null;
}

export interface FormControlProps {
  name: string;
  label: string;
  type?: string;
  subtitle?: string;
  icon?: string | null;
  rules?: unknown[];
  query?: GraphqlActions;
}

export enum FormActions {
  LOGIN = "FORM_ACTION_LOGIN",
  REGISTER = "FORM_ACTION_REGISTER",
  ACCOUNT_UPDATE = "ACCOUNT_UPDATE",
  ACCOUNT_DELETE = "ACCOUNT_DELETE",
  DIVE_CREATE = "FORM_ACTION_DIVE_CREATE",
  DIVE_UPDATE = "FORM_ACTION_DIVE_UPDATE",
}

export interface FormUserCredentials {
  email: string;
  password: string;
  username?: string;
}
