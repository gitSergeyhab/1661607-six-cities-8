import { AuthorizationStatus } from '../constants';
import { Offer } from '../types/types';

export const enum ActionType {
  ChangeCity = 'city/ChangeCity',
  GetOffers = 'offer/GetOffers',
  ChangeOption = 'option/ChangeOption',
  LoadOffers = 'data/main/offers/LoadOffers',
  LoadOffer = 'data/room/offer/LoadOffer',
  LoadComments = 'data/room/comments/LoadComments',
  RequireAuthorization = 'user/requireAuthorization',
  Logout = 'user/Logout',
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

const loadOffer = (offers: Offer) => ({
  type: ActionType.LoadOffer,
  payload: offers,
} as const);

const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

const requireLogout = () => ({type: ActionType.Logout} as const);


export type Actions =
  ReturnType<typeof requireAuthorization> |
  ReturnType<typeof requireLogout> |
  ReturnType<typeof changeCity> |
  ReturnType<typeof getOffers> |
  ReturnType<typeof changeOption> |
  ReturnType<typeof loadOffers> |
  ReturnType<typeof loadOffer>;


export {
  changeCity,
  getOffers,
  changeOption,
  loadOffers,
  loadOffer,
  requireLogout,
  requireAuthorization
};
