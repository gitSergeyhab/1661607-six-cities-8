import { Actions, ActionType } from './action';
import { getOffersByCity, getSortedOffers } from '../utils/util';
import { State } from '../types/types';
import { AuthorizationStatus, CITIES, ReasonContentFailure, SortOption } from '../constants';


const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];

const initialState: State = {
  city: initialCity,
  allOffers: [],
  originOffers: [],
  nearby: [],
  offers: getOffersByCity([], initialCity),
  favoriteOffers: [],
  roomOffer: ReasonContentFailure.Loading,
  comments: [],
  activeOption: SortOption.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  areHotelsLoaded: false,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.RedirectToNotFoundPage:
      return {...state, roomOffer: ReasonContentFailure.NotFound};
    case ActionType.ClearOfferRoom:
      return {...state, roomOffer: ReasonContentFailure.Loading};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.ChangeMainOffers:
      return {
        ...state,
        originOffers: getOffersByCity(state.allOffers, action.payload),
        offers: getOffersByCity(state.allOffers, action.payload),
        areHotelsLoaded: true,
      };
    case ActionType.ChangeOption:
      return {...state,
        activeOption: action.payload,
        offers: getSortedOffers(state.originOffers, action.payload),
      };
    case ActionType.LoadNearby:
      return {...state, nearby: action.payload};
    case ActionType.LoadOffers:
      return {...state, allOffers: action.payload};
    case ActionType.LoadFavoriteOffers:
      return {...state, favoriteOffers: action.payload};
    case ActionType.LoadOffer:
      return {...state, roomOffer: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};
