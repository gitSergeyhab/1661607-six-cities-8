import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { CardType } from '../constants';
import { Actions } from '../store/action';
import { RootState } from '../store/root-reducer';


type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type ServerHost = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
}

type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type City = {
  location: Location,
  name: string,
}

export type Offer = {
  price: number,
  rating: number,
  title: string,
  location: Location,
  city: City,
  type: string,
  previewImage: string,
  isPremium: boolean,
  isFavorite: boolean,
  id: number,
  maxAdults: number,
  bedrooms: number,
  description: string,
  goods: string[],
  images: string[],
  host: Host,
}


export type ServerOffer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: ServerHost,
  id: number,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

type ServerUser = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
}

export type ServerComment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: ServerUser,
}


export type Point = {lat: number, lng: number}

// export type State = {
//   city: string,
//   allOffers: Offer[],
//   originOffers: Offer[],
//   nearby: Offer[],
//   offers: Offer[],
//   favoriteOffers: Offer[],
//   roomOffer: Offer | null,
//   comments: Comment[],
//   activeOption: string,
//   authorizationStatus: AuthorizationStatus,
//   areHotelsLoaded: boolean,
//   areFavoritesLoaded: boolean,
//   roomDataStatus: RoomDataStatus,
// }

export type AuthData = {
  email: string;
  password: string;
};


export type BtnFavoriteSetting = {className: string, width: string, height: string, type: CardType};


export type ThunkActionResult<R=Promise<void>> = ThunkAction<R, RootState, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<RootState, AxiosInstance, Actions>;

export type State  = RootState;
