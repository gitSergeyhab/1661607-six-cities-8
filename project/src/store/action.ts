import { Offer } from '../types/types';

export const enum ActionType {
  ChangeCity = 'city/ChangeCity',
  GetOffers = 'offer/GetOffers',
  ChangeOption = 'option/ChangeOption',
  LoadOffers = 'data/offers/LoadOffers',
  LoadOffer = 'data/offer/LoadOffer',
  LoadComments = 'data/comments/LoadComments',
}

const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

const getOffers = (city: string) => ({
  type: ActionType.GetOffers,
  payload: city,
} as const);


const changeOption = (option: string) => ({
  type: ActionType.ChangeOption,
  payload: option,
} as const);

const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export type Actions =
  ReturnType<typeof changeCity> |
  ReturnType<typeof getOffers> |
  ReturnType<typeof changeOption> |
  ReturnType<typeof loadOffers>;


export {
  changeCity,
  getOffers,
  changeOption
};
