import { EnhancedStore } from '@reduxjs/toolkit';
import { changeNetStatus } from '../store/action';


export const listenNetStatus = (store: EnhancedStore): void => {
  const setOnline = (status: boolean): void => {
    store.dispatch(changeNetStatus(status));
  };

  if (!window.navigator.onLine) {
    setOnline(false);
  }

  window.addEventListener('online', () => setOnline(true));
  window.addEventListener('offline', () => setOnline(false));
};
