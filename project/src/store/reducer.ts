import { CITIES } from '../constants';
import { OFFERS } from '../mocks/offers';
import { Offer } from '../types/types';
import { getOffersByCity } from '../utils/util';
import { Actions, ActionType } from './action';


const INITIAL_CITY_INDEX = 0;

const initialCity = CITIES[INITIAL_CITY_INDEX];


export type State = {
  city: string,
  offers: Offer[];
}

const initialState = {
  city: initialCity,
  offers: getOffersByCity(OFFERS, initialCity),
};

export const reducer = (state = initialState, action: Actions): State => {
  // ??? первые два кейса можно удалять - нет смысла менять город и офферы по отдельности ???
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.GetOffers:
      return {...state, offers: getOffersByCity(OFFERS, action.payload)};
    case ActionType.ChangeCityAndOffers:
      return {...state, city: action.payload, offers: getOffersByCity(OFFERS, action.payload)};
    default:
      return state;
  }
};
