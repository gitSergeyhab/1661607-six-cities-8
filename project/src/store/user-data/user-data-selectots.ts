import { RootReducerKey } from '../root-reducer';
import { State } from '../../types/types';
import { AuthorizationStatus } from '../../constants';

export const getNearby = (state: State): AuthorizationStatus => state[RootReducerKey.UserData].authorizationStatus;
