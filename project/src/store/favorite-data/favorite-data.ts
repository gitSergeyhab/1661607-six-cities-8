import { Actions, ActionType } from '../action';
import { Offer } from '../../types/types';


type FavoriteData = { favoriteOffers: Offer[], areFavoritesLoaded: boolean }

const initialState: FavoriteData = {  favoriteOffers: [], areFavoritesLoaded: false };


export const favoriteData = (state = initialState, action: Actions): FavoriteData => {
  switch (action.type) {
    case ActionType.LoadFavoriteOffers:
      return {...state, favoriteOffers: action.payload, areFavoritesLoaded: true};
    default:
      return state;
  }
};
