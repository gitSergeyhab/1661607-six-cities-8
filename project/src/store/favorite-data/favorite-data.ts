import { createReducer } from '@reduxjs/toolkit';
import { loadFavoriteOffers } from '../action';
import { Offer } from '../../types/types';


type FavoriteData = { favoriteOffers: Offer[], areFavoritesLoaded: boolean }
const initialState: FavoriteData = {  favoriteOffers: [], areFavoritesLoaded: false };

export const favoriteData =  createReducer(initialState, (builder) => {
  builder.addCase(loadFavoriteOffers, (state, action) => {
    state.favoriteOffers = action.payload;
    state.areFavoritesLoaded = true;
  });
});

