import { createReducer } from '@reduxjs/toolkit';
import { changeMainErrorStatus, changeRoomErrorStatus, changeFavoritesErrorStatus } from '../action';


type ErrorStatus = {main: boolean, room: boolean, favorites: boolean}
const initialState: ErrorStatus = {main: false, room: false, favorites: false};


export const errorStatus = createReducer(initialState, (builder) => {
  builder
    .addCase(changeMainErrorStatus, (state, action) => {state.main = action.payload;})
    .addCase(changeRoomErrorStatus, (state, action) => {state.room = action.payload;})
    .addCase(changeFavoritesErrorStatus, (state, action) => {state.favorites = action.payload;});
});
