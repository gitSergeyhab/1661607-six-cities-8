import { CITIES, SortOption } from '../constants';
// import { OFFERS } from '../mocks/offers';
import { Offer } from '../types/types';
import { getOffersByCity, getSortedOffers } from '../utils/util';
import { Actions, ActionType } from './action';

/* eslint-disable no-console */
const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];


export type State = {
  city: string,
  allOffers: Offer[],
  offers: Offer[],
  activeOption: string,
}

const initialState: State = {
  city: initialCity,
  allOffers: [],
  offers: getOffersByCity([], initialCity),
  activeOption: SortOption.Popular,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {...state, offers: getOffersByCity(state.allOffers, action.payload)};
    case ActionType.ChangeOption:
      return {...state, activeOption: action.payload, offers: getSortedOffers(state.offers, action.payload)};
    case ActionType.LoadOffers:
      return {...state, allOffers: action.payload};
    default:
      return state;
  }
};
