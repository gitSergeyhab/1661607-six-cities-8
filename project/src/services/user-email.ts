const USER_EMAIL_KEY = '6-cities-user-email';

const getUserEmail = (): string => localStorage.getItem(USER_EMAIL_KEY) ?? '';

const saveUserEmail = (userEmail: string): void => localStorage.setItem(USER_EMAIL_KEY, userEmail);

const removeUserEmail = (): void => localStorage.removeItem(USER_EMAIL_KEY);

export {
  getUserEmail,
  saveUserEmail,
  removeUserEmail
};
