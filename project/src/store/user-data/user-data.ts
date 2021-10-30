import { Actions, ActionType } from '../action';
import { AuthorizationStatus } from '../../constants';


type UserData = {authorizationStatus: AuthorizationStatus}

const initialState: UserData = {authorizationStatus: AuthorizationStatus.NoAuth};

export const userProcess = (state = initialState, action: Actions): UserData => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};
