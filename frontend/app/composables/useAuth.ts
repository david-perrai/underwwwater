import { useAuthControllerLogin } from "./api/generated/auth/auth";

interface loginResponse {
  success: boolean;
  message: string;
}

interface UseAuth {
  login: (email: string, password: string) => Promise<loginResponse>;
  logout: () => Promise<boolean>;
  isTokenExpired: (token: string | null) => boolean;
  refreshToken: () => Promise<boolean>;
}

export const useAuthToken = () => {

  const logout = async (): Promise<boolean> => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase;

    const headers: Record<string, string> = {};
    if (import.meta.server) {
      const requestHeaders = useRequestHeaders(["cookie"]);
      if (requestHeaders.cookie) {
        headers.cookie = requestHeaders.cookie;
      }
    }

    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers,
      });

      if (!response.ok) return false;

      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      const exp = payload.exp * 1000;
      return Date.now() >= exp - 5000; // 5 secondes de marge
    } catch {
      return true;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const config = useRuntimeConfig();
    const userStore = useUserStore();
    const baseUrl = config.public.apiBase;

    // Forward cookies if on server
    const headers: Record<string, string> = {};
    if (import.meta.server) {
      const requestHeaders = useRequestHeaders(["cookie"]);
      if (requestHeaders.cookie) {
        headers.cookie = requestHeaders.cookie;
      }
    }

    try {
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers,
      });

      if (!response.ok) return false;

      const data = await response.json();
      userStore.loadFromToken(data.accessToken);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return {
    logout,
    isTokenExpired,
    refreshToken,
  };
};

export const useAuth = (): UseAuth => {
  const userStore = useUserStore();
  const loginMutation = useAuthControllerLogin();
  const { logout, isTokenExpired, refreshToken } = useAuthToken();

  const login = async (
    email: string,
    password: string,
  ): Promise<loginResponse> => {
    const loginMutationResponse = await loginMutation.mutateAsync({
      data: {
        email: email,
        password: password,
      },
    });

    if (loginMutationResponse.status === 200) {
      const accessToken = loginMutationResponse.data.accessToken;
      userStore.loadFromToken(accessToken);
      return { success: true, message: "" };
    }

    let message = loginMutationResponse.data.message;

    if (Array.isArray(message)) {
      message = message.join("\n");
    }

    return { success: false, message: message };
  };

  return {
    login,
    logout,
    isTokenExpired,
    refreshToken,
  };
};
