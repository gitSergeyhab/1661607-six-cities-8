import { createReducer } from '@reduxjs/toolkit';
import { changeNetStatus} from '../action';


type NetStatus = {status: boolean}
const initialState: NetStatus = {status: true};


export const netStatus = createReducer(initialState, (builder) => {
  builder.addCase(changeNetStatus, (state, action) => {state.status = action.payload;});
});
