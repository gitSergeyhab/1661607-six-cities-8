import { AuthorizationStatus, CITIES, SortOption } from '../constants';
// import { OFFERS } from '../mocks/offers';
// import { Offer } from '../types/types';
import { State } from '../types/types';
import { getOffersByCity, getSortedOffers } from '../utils/util';
import { Actions, ActionType } from './action';

/* eslint-disable no-console */
const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];

const initialState: State = {
  city: initialCity,
  allOffers: [],
  offers: getOffersByCity([], initialCity),
  activeOption: SortOption.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isHotelsLoaded: false,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.Login:
      return {...state, authorizationStatus: AuthorizationStatus.Auth};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {...state, offers: getOffersByCity(state.allOffers, action.payload), isHotelsLoaded: true};
    case ActionType.ChangeOption:
      return {...state, activeOption: action.payload, offers: getSortedOffers(state.offers, action.payload)};
    case ActionType.LoadOffers:
      return {...state, allOffers: action.payload};
    default:
      return state;
  }
};
