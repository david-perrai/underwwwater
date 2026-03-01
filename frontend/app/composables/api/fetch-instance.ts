import { useAuthStore } from '@/stores/auth';

export const authFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const baseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:3001';
  const authStore = useAuthStore();

  // Ne pas intercepter les appels d'auth pour éviter les boucles infinies
  const isAuthPath = url.includes('/auth/login') || url.includes('/auth/refresh');
  
  if (!isAuthPath && authStore.accessToken) {
    if (authStore.isTokenExpired(authStore.accessToken)) {
      try {
        // Tentative de refresh
        const refreshResponse = await fetch(`${baseUrl}/auth/refresh`, {
          method: 'POST',
          // Les cookies (refreshToken) sont envoyés automatiquement
        });

        if (refreshResponse.ok) {
          const { accessToken } = await refreshResponse.json();
          authStore.setAccessToken(accessToken);
        } else {
          authStore.setAccessToken(null);
          // Optionnel: rediriger vers login
        }
      } catch (error) {
        authStore.setAccessToken(null);
      }
    }
  }

  const headers = new Headers(options.headers);
  if (authStore.accessToken) {
    headers.set('Authorization', `Bearer ${authStore.accessToken}`);
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  // Gérer le cas où le token expire pile au moment de l'appel (401)
  if (response.status === 401 && !isAuthPath) {
     // On pourrait retenter le refresh ici, mais la vérification préventive est déjà faite.
     // Cependant, si le serveur renvoie 401, on nettoie le store
     authStore.setAccessToken(null);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Network response was not ok');
  }

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
};
