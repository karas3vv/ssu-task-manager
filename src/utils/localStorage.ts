const TOKEN_KEY = 'task_manager_token';
const LAST_ROUTE_KEY = 'task_manager_last_route';

export const tokenStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  clearToken: (): void => localStorage.removeItem(TOKEN_KEY),
};

export const routeStorage = {
  getLastRoute: (): string | null => localStorage.getItem(LAST_ROUTE_KEY),
  setLastRoute: (route: string): void => localStorage.setItem(LAST_ROUTE_KEY, route),
  clearLastRoute: (): void => localStorage.removeItem(LAST_ROUTE_KEY),
};
