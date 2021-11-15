import { combineReducers } from 'redux';
import { mainData } from './main-data/main-data';
import { roomData } from './room-data/room-data';
import { favoriteData } from './favorite-data/favorite-data';
import { userData } from './user-data/user-data';
import { netStatus } from './net-status/net-status';
import { errorStatus } from './error-status/error-status';


export const enum RootReducerKey {
  MainData = 'MainData',
  RoomData = 'RoomData',
  FavoriteData = 'FavoriteData',
  UserData = 'UserData',
  NetStatus = 'NetStatus',
  ErrorStatus = 'ErrorStatus',
}

export const rootReducer = combineReducers({
  [RootReducerKey.MainData]: mainData,
  [RootReducerKey.RoomData]: roomData,
  [RootReducerKey.FavoriteData]: favoriteData,
  [RootReducerKey.UserData]: userData,
  [RootReducerKey.NetStatus]: netStatus,
  [RootReducerKey.ErrorStatus]: errorStatus,
});

export type RootState = ReturnType<typeof rootReducer>;
