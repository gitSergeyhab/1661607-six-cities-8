import { combineReducers } from 'redux';
import { mainData } from './main-data/main-data';
import { roomData } from './room-data/room-data';
import { favoriteData } from './favorite-data/favorite-data';
import { userData } from './user-data/user-data';


export const enum RootReducerKey {
  MainData = 'MainData',
  RoomData = 'RoomData',
  FavoriteData = 'FavoriteData',
  UserData = 'UserData',
}

export const rootReducer = combineReducers({
  [RootReducerKey.MainData]: mainData,
  [RootReducerKey.RoomData]: roomData,
  [RootReducerKey.FavoriteData]: favoriteData,
  [RootReducerKey.UserData]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
