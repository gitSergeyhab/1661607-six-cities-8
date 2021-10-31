import { RootReducerKey } from '../root-reducer';
import { Comment, Offer, State } from '../../types/types';
import { RoomDataStatus } from '../../constants';

const fieldState = RootReducerKey.RoomData;

export const getNearby = (state: State): Offer[] => state[fieldState].nearby;
export const getRoomOffer = (state: State): Offer | null => state[fieldState].roomOffer;
export const getComments = (state: State): Comment[] => state[fieldState].comments;
export const getRoomDataStatus = (state: State): RoomDataStatus => state[fieldState].roomDataStatus;
