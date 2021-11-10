import { RootReducerKey } from '../root-reducer';
import { State } from '../../types/types';

export const getNetStatus = (state: State): boolean => state[RootReducerKey.NetStatus].online;

