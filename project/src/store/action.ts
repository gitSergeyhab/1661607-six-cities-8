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
  ChangeRoomDataStatus = 'room/ChangeRoomDataStatus',
  ChangeNetStatus = 'net/ChangeNetStatus',
  ChangeCityAndSorting = 'main/city-option/ChangeCityAndSorting',
  ChangeMainErrorStatus = 'error/main/ChangeMainErrorStatus',
  ChangeRoomErrorStatus = 'error/room/ChangeRoomErrorStatus',
  ChangeFavoritesErrorStatus = 'error/favorite/ChangeFavoritesErrorStatus',
}

//Main
const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offer[]) => ({payload: offers}),
);

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

const changeCityAndSorting = createAction(ActionType.ChangeCityAndSorting);


//Room
const changeRoomDataStatus = createAction(
  ActionType.ChangeRoomDataStatus,
  (status: RoomDataStatus) => ({payload: status}),
);

const loadOffer =  createAction(
  ActionType.LoadOffer,
  (offer: Offer) => ({payload: offer}),
);

const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comment[]) => ({payload: comments}),
);

const loadNearby = createAction(
  ActionType.LoadNearby,
  (offers: Offer[]) => ({ payload: offers}),
);


//Favorites
const loadFavoriteOffers = createAction(
  ActionType.LoadFavoriteOffers,
  (offers: Offer[]) => ({payload: offers}),
);


//Authorization
const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

const requireLogout = createAction(ActionType.Logout);


const redirectToNotFoundPage = createAction(ActionType.RedirectToNotFoundPage);

// Network
const changeNetStatus = createAction(
  ActionType.ChangeNetStatus,
  (online: boolean) => ({payload: online}),
);

// Error
const changeMainErrorStatus = createAction(
  ActionType.ChangeMainErrorStatus,
  (error: boolean) => ({payload: error}),
);

const changeRoomErrorStatus = createAction(
  ActionType.ChangeRoomErrorStatus,
  (error: boolean) => ({payload: error}),
);

const changeFavoritesErrorStatus = createAction(
  ActionType.ChangeFavoritesErrorStatus,
  (error: boolean) => ({payload: error}),
);

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
  changeRoomDataStatus,
  changeNetStatus,
  changeCityAndSorting,
  changeMainErrorStatus,
  changeRoomErrorStatus,
  changeFavoritesErrorStatus
};
