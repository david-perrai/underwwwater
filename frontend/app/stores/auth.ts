import { defineStore } from 'pinia';

/**
 * Authentication Store
 */
export const useAuthStore = defineStore('auth', () => {
  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
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
    const refreshTokenCookie = useCookie("refreshToken");

    // Forward cookies if on server
    const headers: Record<string, string> = {};
    if (import.meta.server) {
      const requestHeaders = useRequestHeaders(['cookie']);
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

      if(response.ok) {
        const data = await response.json();
        userStore.loadFromToken(data.accessToken);
      }
      return response.ok;
    } catch (error) {             
      return false;
    }
  };

  return {
    isTokenExpired,
    refreshToken,
  };
});
