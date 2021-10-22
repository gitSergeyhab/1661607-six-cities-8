import { Offer } from '../types/types';

export const enum ActionType {
  ChangeCity = 'city/ChangeCity',
  GetOffers = 'offer/GetOffers',
  ChangeOption = 'option/ChangeOption',
  LoadOffers = 'data/offers/LoadOffers',
  LoadOffer = 'data/offer/LoadOffer',
  LoadComments = 'data/comments/LoadComments',
  Login = 'user/Login',
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

const requireLogin = () => ({type: ActionType.Login} as const);

const requireLogout = () => ({type: ActionType.Logout} as const);


export type Actions =
  ReturnType<typeof requireLogin> |
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
  requireLogin,
  requireLogout
};
