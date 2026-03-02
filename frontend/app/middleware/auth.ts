/**
 * Auth Middleware
 *
 * Vérifie que l'utilisateur est authentifié côté serveur ET client.
 * Lit l'accessToken depuis le cookie (accessible en SSR via useCookie).
 * Redirige vers /login si aucune session valide n'est trouvée.
 */
export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie("accessToken");
  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 1. If we have a valid (non-expired) token
  if (accessToken.value && !authStore.isTokenExpired(accessToken.value)) {
    if (!userStore.isLoggedIn) {
      userStore.loadFromToken(accessToken.value);
    }
    return;
  }

  // 2. If token is missing or expired, try to refresh
  const isRefreshSuccess = await authStore.refreshToken();
  if (isRefreshSuccess) return;

  // 3. No valid token and refresh failed → redirect to login
  return navigateTo("/login");
});
