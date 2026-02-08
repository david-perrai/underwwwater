import { defineStore } from 'pinia';
import { useCookie } from '#imports';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useCookie<string | null>('access_token', {
    maxAge: 60 * 60 * 24, // 1 jour par défaut, sera écrasé par le token réel
    watch: true,
  });

  const setAccessToken = (token: string | null) => {
    accessToken.value = token;
  };

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

  return {
    accessToken,
    setAccessToken,
    isTokenExpired,
  };
});
