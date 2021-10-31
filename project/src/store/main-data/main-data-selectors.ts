import { RootReducerKey } from '../root-reducer';
import { Offer, State } from '../../types/types';

const fieldState = RootReducerKey.MainData;

export const getAllOffers = (state: State): Offer[] => state[fieldState].allOffers;
export const getHotelsLoadedStatus = (state: State): boolean => state[fieldState].areHotelsLoaded;
export const getCity = (state: State): string => state[fieldState].city;
export const getOriginOffers = (state: State): Offer[] => state[fieldState].originOffers;
export const getCityOffers = (state: State): Offer[] => state[fieldState].offers;
export const getActiveOption = (state: State): string => state[fieldState].activeOption;
