import type { FormUserCredentials } from "@/types/models/form";
import type { StoreUserInterface, StoreUserDataInterface } from "@/types/models/storeUser";
import { useAlertFactory } from "./alertFactory";
import { useJWTParser } from "./utils/jwtParser";

const USER_STATE_KEY = "user-auth";

/**
 * Global User State composable
 */
export const useUserState = () => useState<StoreUserInterface>(USER_STATE_KEY, () => ({
  token: null,
  refresh_token: null,
  data: {
    iat: null,
    exp: null,
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
  }
}));

/**
 * Global Authentication Login function.
 * @param {FormUserCredentials} credentials
 * @return {Promise<any>}
 */
export async function useAuthLogin(
  credentials: FormUserCredentials
): Promise<any> {
  const userState = useUserState();

  try {
    const response = await $fetch<{ data: { token: string; refresh_token: string } }>("/login", {
      method: "POST",
      body: credentials,
    });

    if (response.data.token) {
      const parsedToken: StoreUserDataInterface = useJWTParser(
        response.data.token
      );

      userState.value.token = response.data.token;
      userState.value.refresh_token = response.data.refresh_token;
      userState.value.data = parsedToken;

      useAlertFactory(
        "success",
        "You are logged, welcome back " + parsedToken.username + "!"
      );

      return navigateTo({ name: "index" });
    }
  } catch (error: any) {
    const message =
      error.response?.status == 401
        ? "Error 401: Invalid credentials. Try to login again."
        : "Error " +
          (error.response?.status || "Unknown") +
          ": Undefined error. Please contact admin";

    const type = error.response?.status == 401 ? "warning" : "error";

    useAlertFactory(type, message);

    return navigateTo({ name: "index" });
  }
}

/**
 * Global Authentication Logout function
 * @return {void}
 */
export function useAuthLogout(): void {
  const userState = useUserState();
  userState.value.token = null;
  userState.value.refresh_token = null;
  userState.value.data = {
    iat: null,
    exp: null,
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
  };
}

/**
 * Simple util bool isLogged to manage display
 * @return {boolean}
 */
export function isLogged(): boolean {
  const userState = useUserState();
  return !!(userState.value.token && userState.value.refresh_token);
}
