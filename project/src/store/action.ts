import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RoomDataStatus } from '../constants';
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
  ChangeRoomDataStatus = 'room/ChangeRoomDataStatus'
}

const changeCity = createAction(
  ActionType.ChangeCity,
  (city: string) => ({payload: city}),
);

const changeMainOffers = createAction(
  ActionType.ChangeMainOffers,
  (city: string) => ({payload: city}),
);

const changeOption = createAction(
  ActionType.ChangeOption,
  (option: string) => ({payload: option}),
);

const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offer[]) => ({payload: offers}),
);

const loadNearby = createAction(
  ActionType.LoadNearby,
  (offers: Offer[]) => ({ payload: offers}),
);

const loadOffer =  createAction(
  ActionType.LoadOffer,
  (offer: Offer) => ({payload: offer}),
);

const loadFavoriteOffers = createAction(
  ActionType.LoadFavoriteOffers,
  (offers: Offer[]) => ({payload: offers}),
);

const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);


const requireLogout = createAction(ActionType.Logout);

const changeRoomDataStatus = createAction(
  ActionType.ChangeRoomDataStatus,
  (status: RoomDataStatus) => ({payload: status}),
);

const redirectToNotFoundPage = createAction(ActionType.RedirectToNotFoundPage);


const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comment[]) => ({payload: comments}),
);


export type Actions =
  ReturnType<typeof changeRoomDataStatus> |
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
  changeRoomDataStatus
};
