import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, requireLogout } from '../action';
import { AuthorizationStatus } from '../../constants';


type UserData = {authorizationStatus: AuthorizationStatus}
const initialState: UserData = {authorizationStatus: AuthorizationStatus.NoAuth};


export const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {state.authorizationStatus = action.payload;})
    .addCase(requireLogout, (state) => {state.authorizationStatus = AuthorizationStatus.NoAuth;});
});
