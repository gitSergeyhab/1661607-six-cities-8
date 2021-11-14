import { createReducer } from '@reduxjs/toolkit';

import { changeCity, changeCityAndSorting, changeMainOffers, changeOption, loadOffers } from '../action';
import { filterAndSortOffers, getOffersByCity, getSortedOffers } from '../../utils/util';
import { Offer } from '../../types/types';
import { CITIES, SortOption } from '../../constants';


const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];

type MainData = {
  allOffers: Offer[],
  areHotelsLoaded: boolean,
  city: string,
  originOffers: Offer[],
  offers: Offer[],
  activeOption: string,
}

const initialState: MainData = {
  allOffers: [],
  areHotelsLoaded: false,
  city: initialCity,
  originOffers: [],
  offers: getOffersByCity([], initialCity),
  activeOption: SortOption.Popular,
};


export const mainData = createReducer (initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.allOffers = action.payload;
      state.areHotelsLoaded = true;
    })
    .addCase(changeCity, (state, action) => {state.city = action.payload;})
    .addCase(changeMainOffers, (state, action) => {
      state.originOffers = getOffersByCity(state.allOffers, action.payload);
      state.offers = filterAndSortOffers(state.allOffers, action.payload, state.activeOption);
    })
    .addCase(changeOption, (state, action) => {
      state.activeOption = action.payload;
      state.offers = getSortedOffers(state.originOffers, action.payload);
    })
    .addCase(changeCityAndSorting, (state) => {
      state.originOffers = getOffersByCity(state.allOffers, state.city);
      state.offers = filterAndSortOffers(state.allOffers, state.city, state.activeOption);
    });
});
