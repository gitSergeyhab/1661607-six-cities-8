const AUTH_TOKEN_KEY = '6-cities-token';

const getToken = (): string => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

const saveToken = (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token);

const removeToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

export {
  getToken,
  saveToken,
  removeToken
};
