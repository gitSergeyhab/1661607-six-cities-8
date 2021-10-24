import { AuthorizationStatus, CITIES, SortOption } from '../constants';
import { State } from '../types/types';
import { getOffersByCity, getSortedOffers } from '../utils/util';
import { Actions, ActionType } from './action';

const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];

const initialState: State = {
  city: initialCity,
  allOffers: [],
  originOffers: [],
  offers: getOffersByCity([], initialCity),
  activeOption: SortOption.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isHotelsLoaded: false,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {
        ...state,
        originOffers: getOffersByCity(state.allOffers, action.payload),
        offers: getOffersByCity(state.allOffers, action.payload),
        isHotelsLoaded: true,
      };
    case ActionType.ChangeOption:
      return {...state,
        activeOption: action.payload,
        offers: getSortedOffers(state.originOffers, action.payload),
      };
    case ActionType.LoadOffers:
      return {...state, allOffers: action.payload};
    default:
      return state;
  }
};
