import type { FormUserCredentials } from "@/types/models/form";
import type {  JWTAuthInterface, UserInterface } from "~/types/models/user";
import { useAlertFactory } from "./alertFactory";
import { useJWTParser } from "./utils/jwtParser";

const USER_STATE_KEY = "user-auth";
const ACCESS_TOKEN_KEY = "underwater_access_token";
const { apiBase } = useRuntimeConfig().public;

/**
 * Global User State composable
 */
export const useUserState = () => useState<UserInterface>(USER_STATE_KEY, () => ({
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
  }
));

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
    const response = await $fetch<JWTAuthInterface>(`${apiBase}/auth/login`, {
      method: "POST",
      body: credentials,
    });

    if (response.accessToken) {

      const parsedToken = useJWTParser(response.accessToken);

      userState.value = parsedToken

      sessionStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
      
      useAlertFactory(
        "success",
        "You are logged, welcome back " + parsedToken.username + "!"
      );

      return navigateTo({name: "index"});
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

    return navigateTo({name: "index"});
  }
}

/**
 * Global Authentication Logout function
 * @return {void}
 */
export function useAuthLogout(): void {
    
  const userState = useUserState();
  userState.value = {
    id: null,
    email: null,
    roles: [],
    username: null,
    avatar: null,
    subscribedAt: null,
    updatedAt: null,
    activatedAt: null,
    iat: null,
    exp: null,
  };

  sessionStorage.removeItem(ACCESS_TOKEN_KEY);

  navigateTo({name: "index"});

  $fetch(`${apiBase}/auth/logout`, {
    method: "POST",      
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem(ACCESS_TOKEN_KEY)
    }
  });
}

/**
 * Simple util bool isLogged to manage display
 * @return {boolean}
 */
export function isLogged(): boolean {
  const userState = useUserState();

  if(userState.value.id){
    return true;
  }

  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  if(accessToken){
    const parsedToken = useJWTParser(accessToken);
    userState.value = parsedToken
    return true;
  }
   
  return false;
}
