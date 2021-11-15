const USER_EMAIL_KEY = '6-cities-user-email';
const USER_AVATAR_KEY = '6-cities-user-avatar';


const getUserEmail = (): string => localStorage.getItem(USER_EMAIL_KEY) ?? '';
const saveUserEmail = (userEmail: string): void => localStorage.setItem(USER_EMAIL_KEY, userEmail);
const removeUserEmail = (): void => localStorage.removeItem(USER_EMAIL_KEY);

const getAvatar = (): string => localStorage.getItem(USER_AVATAR_KEY) ?? '';
const saveAvatar = (avatar: string): void => localStorage.setItem(USER_AVATAR_KEY, avatar);
const removeAvatar = (): void => localStorage.removeItem(USER_EMAIL_KEY);


export {
  getUserEmail,
  saveUserEmail,
  removeUserEmail,
  getAvatar,
  saveAvatar,
  removeAvatar
};
