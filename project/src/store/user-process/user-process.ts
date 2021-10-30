import { Actions, ActionType } from '../action';
import { AuthorizationStatus } from '../../constants';


type UserProcess = {authorizationStatus: AuthorizationStatus}

const initialState: UserProcess = {authorizationStatus: AuthorizationStatus.NoAuth};

export const userProcess = (state = initialState, action: Actions): UserProcess => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};
