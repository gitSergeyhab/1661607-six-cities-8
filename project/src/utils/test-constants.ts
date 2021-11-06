import { AuthorizationStatus, CITIES, RoomDataStatus, SortOption } from '../constants';
import { makeFakeCommentList, makeFakeFavoritesList, makeFakeOffer, makeFakeOfferList } from './mocks';


const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOfferList();
const fakeFavorites = makeFakeFavoritesList();
const fakeComments = makeFakeCommentList();


export const INITIAL_CITY_INDEX = 0;
export const TEST_ID = 11;

export const initialCity = CITIES[INITIAL_CITY_INDEX];

export const stateAuthAndFilled = {
  MainData: {
    allOffers: fakeOffers,
    areHotelsLoaded: true,
    city: initialCity,
    originOffers: fakeOffers,
    offers: fakeOffers,
    activeOption: SortOption.Popular,
  },
  FavoriteData: {
    favoriteOffers: fakeFavorites,
    areFavoritesLoaded: true,
  },
  RoomData: {
    nearby: fakeOffers,
    roomOffer: fakeOffer,
    comments: fakeComments,
    roomDataStatus: RoomDataStatus.Ok,
  },
  UserData: {authorizationStatus: AuthorizationStatus.Auth},
};

export const stateNoAuthAndEmpty = {
  MainData: {
    allOffers: [],
    areHotelsLoaded: true,
    city: initialCity,
    originOffers: [],
    offers: [],
    activeOption: SortOption.Popular,
  },
  FavoriteData: {
    favoriteOffers: [],
    areFavoritesLoaded: true,
  },
  RoomData: {
    nearby: fakeOffers,
    roomOffer: fakeOffer,
    comments: fakeComments,
    roomDataStatus: RoomDataStatus.Ok,
  },
  UserData: {authorizationStatus: AuthorizationStatus.NoAuth},
};

export const ScreenText = {
  Main: {
    Filled: {
      Places: /to stay in/i,
      Sort: /Sort by/i,
    },
    Empty: {
      Status: /No places to stay available/i,
      Description: /We could not find any property available at the moment in/i,
    },
  },
  Favorite: {
    Filled: {
      Title: /Saved listing/i,
      City: new RegExp(initialCity, 'i'),
    },
    Empty: {
      Status: /Nothing yet saved/i,
      Description: /Save properties to narrow down search or plan your future trips/i,
    },
  },
  Login: {
    Email: /Email/i,
    Password: /Password/i,
    SignIn: /Sign In/i,
  },
  Room: {
    All: {
      Goods: /What's inside/i,
      Nearby: /Other places in the neighbourhood/i,
    },
    Auth: {
      Review: /Your review/i,
    },
  },
  Page404: {
    Message: /Page Not Found/i,
    Link: /TO THE MAIN PAGE/i,
  },
};

