import { EnhancedStore } from '@reduxjs/toolkit';
import { changeNetStatus } from '../store/action';

export const listenNetStatus = (store: EnhancedStore): void => {
  window.addEventListener('online', () => {
    store.dispatch(changeNetStatus(true));
  });
  window.addEventListener('offline', () => {
    store.dispatch(changeNetStatus(false));
  });
};
