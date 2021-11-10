import { RootReducerKey } from '../root-reducer';
import { createSelector } from 'reselect';
import { Comment, Offer, State } from '../../types/types';
import { RoomDataStatus } from '../../constants';
import { getSortedReviewsByDate } from '../../utils/date-util';


const MAX_COMMENTS_NUMBER = 10;

const fieldState = RootReducerKey.RoomData;

export const getNearby = (state: State): Offer[] => state[fieldState].nearby;
export const getRoomOffer = (state: State): Offer | null => state[fieldState].roomOffer;
export const getComments = (state: State): Comment[] => state[fieldState].comments;
export const getRoomDataStatus = (state: State): RoomDataStatus => state[fieldState].roomDataStatus;

export const getCommentsForRender = createSelector(
  [getComments], (comments) => getSortedReviewsByDate(comments).slice(0, MAX_COMMENTS_NUMBER),
);
