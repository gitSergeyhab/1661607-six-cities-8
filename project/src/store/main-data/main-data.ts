import { Actions, ActionType } from '../action';
import { getOffersByCity, getSortedOffers } from '../../utils/util';
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


export const mainData = (state = initialState, action: Actions): MainData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {...state, allOffers: action.payload, areHotelsLoaded: true};
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.ChangeMainOffers:
      return {
        ...state,
        originOffers: getOffersByCity(state.allOffers, action.payload),
        offers: getOffersByCity(state.allOffers, action.payload),
      };
    case ActionType.ChangeOption:
      return {...state,
        activeOption: action.payload,
        offers: getSortedOffers(state.originOffers, action.payload),
      };
    default:
      return state;
  }
};
