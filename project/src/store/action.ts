import { AuthorizationStatus } from '../constants';
import { Comment, Offer } from '../types/types';


export const enum ActionType {
  ChangeCity = 'main/city/ChangeCity',
  ChangeMainOffers = 'main/offers/ChangeMainOffers',
  ChangeOption = 'main/option/ChangeOption',
  LoadOffers = 'data/main/offers/LoadOffers',
  LoadFavoriteOffers = 'data/favorite/offers/LoadFavoriteOffers',
  LoadNearby = 'data/room/offers/LoadNearby',
  LoadOffer = 'data/room/offer/LoadOffer',
  LoadComments = 'data/room/comments/LoadComments',
  RequireAuthorization = 'user/requireAuthorization',
  Logout = 'user/Logout',
  RedirectToNotFoundPage = 'error404/RedirectToNotFoundPage',
  ClearOfferRoom = 'room/offer/ClearOfferRoom',
}

const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

const changeMainOffers = (city: string) => ({
  type: ActionType.ChangeMainOffers,
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

const loadNearby = (offers: Offer[]) => ({
  type: ActionType.LoadNearby,
  payload: offers,
} as const);

const loadOffer = (offers: Offer) => ({
  type: ActionType.LoadOffer,
  payload: offers,
} as const);

const loadFavoriteOffers = (offers: Offer[]) => ({
  type: ActionType.LoadFavoriteOffers,
  payload: offers,
} as const);

const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);


const requireLogout = () => ({type: ActionType.Logout} as const);

const redirectToNotFoundPage = () => ({type: ActionType.RedirectToNotFoundPage} as const);

const clearOfferRoom = () => ({type: ActionType.ClearOfferRoom} as const);

const loadComments = (comments: Comment[]) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);


export type Actions =
  ReturnType<typeof clearOfferRoom> |
  ReturnType<typeof redirectToNotFoundPage> |
  ReturnType<typeof requireAuthorization> |
  ReturnType<typeof requireLogout> |
  ReturnType<typeof changeCity> |
  ReturnType<typeof changeMainOffers> |
  ReturnType<typeof changeOption> |
  ReturnType<typeof loadOffers> |
  ReturnType<typeof loadFavoriteOffers> |
  ReturnType<typeof loadNearby> |
  ReturnType<typeof loadOffer> |
  ReturnType<typeof loadComments>;


export {
  changeCity,
  changeMainOffers,
  changeOption,
  loadOffers,
  loadFavoriteOffers,
  loadNearby,
  loadOffer,
  loadComments,
  requireLogout,
  requireAuthorization,
  redirectToNotFoundPage,
  clearOfferRoom
};
