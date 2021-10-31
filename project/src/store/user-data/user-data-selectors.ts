import { RootReducerKey } from '../root-reducer';
import { State } from '../../types/types';
import { AuthorizationStatus } from '../../constants';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[RootReducerKey.UserData].authorizationStatus;
