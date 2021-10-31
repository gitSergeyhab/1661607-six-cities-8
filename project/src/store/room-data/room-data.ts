import { createReducer } from '@reduxjs/toolkit';

import { changeRoomDataStatus, loadComments, loadNearby, loadOffer } from '../action';
import { Offer, Comment } from '../../types/types';
import { RoomDataStatus } from '../../constants';


type RoomData = {
  nearby: Offer[],
  roomOffer: Offer | null,
  comments: Comment[],
  roomDataStatus: RoomDataStatus,
}

const initialState: RoomData = {
  nearby: [],
  roomOffer: null,
  comments: [],
  roomDataStatus: RoomDataStatus.Loading,
};


export const roomData = createReducer (initialState, (builder) => {
  builder
    .addCase(changeRoomDataStatus, (state, action) => {state.roomDataStatus = action.payload;})
    .addCase(loadNearby, (state, action) => {state.nearby = action.payload;})
    .addCase(loadOffer, (state, action) => {state.roomOffer = action.payload;})
    .addCase(loadComments, (state, action) => {state.comments = action.payload;});
});
