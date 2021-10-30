import { combineReducers } from 'redux';
import { mainData } from './main-data/main-data';
import { roomData } from './room-data/room-data';
import { favoriteData } from './favorite-data/favorite-data';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  Main: mainData,
  Room: roomData,
  Favorite: favoriteData,
  User: userProcess,
});
