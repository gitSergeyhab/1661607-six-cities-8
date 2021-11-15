import { RootReducerKey } from '../root-reducer';
import { State } from '../../types/types';


export const getMainErrorStatus = (state: State): boolean => state[RootReducerKey.ErrorStatus].main;
export const getRoomErrorStatus = (state: State): boolean => state[RootReducerKey.ErrorStatus].room;
export const getFavoritesErrorStatus = (state: State): boolean => state[RootReducerKey.ErrorStatus].favorites;
