import { Point } from './types/types';

const RATING_COEFFICIENT = 20;

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const FavoriteBtnProp = {
  CARD: {className: 'place-card', width: '18', height: '19'},
  PROPERTY: {className: 'property', width: '31', height: '33'},
};

const STARS = [
  {score: 5, titleName: 'perfect'},
  {score: 4, titleName: 'good'},
  {score: 3, titleName: 'not bad'},
  {score: 2, titleName: 'badly'},
  {score: 1, titleName: 'terribly'},
];


const CityCoordinate: {[property: string]: Point} = {
  AMSTERDAM: {lat: 52.3809553943508, lng: 4.9},
  PARIS: {lat: 48.8534, lng: 2.3488},
  BRUSSELS: {lat: 50.8504, lng: 4.34878},
  HAMBURG: {lat: 53.55, lng: 10},
  COLOGNE: {lat: 50.936, lng: 6.95},
  DUSSELDORF: {lat: 51.2217, lng: 6.77616},
};

const SortOption: {[prop: string]: string} = {
  Popular: 'Popular',
  PriceLowToHight:'Price: low to high',
  PriceHightToLow: 'Price: high to low',
  TopRated: 'Top rated first',
};

const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/not-found',
}

const enum APIRoute {
  Hotels = '/hotels',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Status = '/:status',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

const enum ReasonContentFailure {
  Loading = 'Loading',
  NotFound = 'NotFound',
}

export {
  RATING_COEFFICIENT,
  CITIES,
  FavoriteBtnProp,
  STARS,
  CityCoordinate,
  SortOption,
  AppRoute,
  APIRoute,
  AuthorizationStatus,
  ReasonContentFailure
};
