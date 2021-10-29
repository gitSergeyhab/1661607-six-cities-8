import { Actions, ActionType } from './action';
import { getOffersByCity, getSortedOffers } from '../utils/util';
import { Offer, State } from '../types/types';
import { AuthorizationStatus, CITIES, SortOption, RoomDataStatus } from '../constants';


const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];


const defaultOffer: Offer = {
  price: 0,
  rating: 0,
  title: '',
  location: {latitude: 0,longitude: 0,zoom: 1},
  city: {
    location: {latitude: 0,longitude: 0,zoom: 1},
    name: '',
  },
  type: '',
  previewImage: '',
  isPremium: false,
  isFavorite: false,
  id: 1,
  maxAdults: 0,
  bedrooms: 0,
  description: '',
  goods: [],
  images: [],
  host: {avatarUrl: '',id: 0,isPro: false,name: ''},
};

const initialState: State = {
  city: initialCity,
  allOffers: [],
  originOffers: [],
  nearby: [],
  offers: getOffersByCity([], initialCity),
  favoriteOffers: [],
  roomOffer: defaultOffer,
  comments: [],
  activeOption: SortOption.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  areHotelsLoaded: false,
  areFavoritesLoaded: false,
  roomDataStatus: RoomDataStatus.Loading,
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeRoomDataStatus:
      return {...state, roomDataStatus: action.payload};
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
      return {
        ...state,
        favoriteOffers: action.payload,
        areFavoritesLoaded: true,
      };
    case ActionType.LoadOffer:
      return {...state, roomOffer: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    default:
      return state;
  }
};
