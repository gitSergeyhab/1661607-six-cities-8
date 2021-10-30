import { Actions, ActionType } from '../action';
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


export const roomData = (state = initialState, action: Actions): RoomData => {
  switch (action.type) {
    case ActionType.ChangeRoomDataStatus:
      return {...state, roomDataStatus: action.payload};
    case ActionType.LoadNearby:
      return {...state, nearby: action.payload};
    case ActionType.LoadOffer:
      return {...state, roomOffer: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};

