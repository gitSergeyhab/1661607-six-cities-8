import { createReducer } from '@reduxjs/toolkit';
import { changeNetStatus} from '../action';


type NetStatus = {online: boolean}
const initialState: NetStatus = {online: true};


export const netStatus = createReducer(initialState, (builder) => {
  builder.addCase(changeNetStatus, (state, action) => {state.online = action.payload;});
});
