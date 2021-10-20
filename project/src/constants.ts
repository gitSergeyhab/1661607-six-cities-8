import { Point } from './types/types';

const RATING_COEFFICIENT = 20;

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];


const FavoriteBtnProp = {
  CARD: {className: 'place-card', width: '18', height: '19'},
  PROPERTY: {className: 'property', width: '31', height: '33'},
};

const STARS = [
  {score: '5', titleName: 'perfect'},
  {score: '4', titleName: 'good'},
  {score: '3', titleName: 'not bad'},
  {score: '2', titleName: 'badly'},
  {score: '1', titleName: 'terribly'},
];

const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

const enum TypeOfferCard {
  Main = 'Main',
  Favorite = 'Favorite'
}

const CityCoordinate: {[property: string]: Point} = {
  AMSTERDAM: {lat: 52.3809553943508, lng: 4.939309666406198},
  PARIS: {lat: 48.8534, lng: 2.3488},
  BRUSSELS: {lat: 50.8504, lng: 4.34878},
  HAMBURG: {lat: 53.5753, lng: 10.0153},
  COLOGNE: {lat: 50.8936, lng: 7.0731},
  DUSSELDORF: {lat: 51.2217, lng: 6.77616},
};


export {
  RATING_COEFFICIENT,
  CITIES,
  FavoriteBtnProp,
  STARS,
  AppRoute,
  AuthorizationStatus,
  TypeOfferCard,
  CityCoordinate
};
