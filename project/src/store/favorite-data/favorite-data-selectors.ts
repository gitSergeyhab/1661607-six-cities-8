import { RootReducerKey } from '../root-reducer';
import { Offer, State } from '../../types/types';

const fieldState = RootReducerKey.FavoriteData;

export const getFavoriteOffers = (state: State): Offer[] => state[fieldState].favoriteOffers;
export const getFavoritesLoadedStatus = (state: State): boolean => state[fieldState].areFavoritesLoaded;
